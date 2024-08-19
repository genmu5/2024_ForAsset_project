package com.example._2024_for_asset_spring.controller.customer;

import com.example._2024_for_asset_spring.entity.spring.chat.ChatHistory;
import com.example._2024_for_asset_spring.entity.spring.chat.Message;
import com.example._2024_for_asset_spring.service.customer.ChatService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ChatController {

    @Value("${chatGptApiUrl}")
    private String chatGptApiUrl;

    @Value("${chatGptApiKey}")
    private String chatGptApiKey;

    private final RestTemplate restTemplate;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
        this.restTemplate = new RestTemplate();  // RestTemplate 인스턴스를 생성합니다.
    }

    @MessageMapping("/message")
    public void processMessage(Message message) {
        String channelId = message.getChannelId();

        // 사용자 메시지를 저장합니다.
        chatService.saveMessage(channelId, message.getSender(), message.getData().toString());

        // ChatGPT API 호출
        String chatGptResponse = callChatGptApi(channelId, message.getData().toString());

        // ChatGPT의 응답을 저장하고 클라이언트에게 전송
        chatService.saveMessage(channelId, "ChatGPT", chatGptResponse);
        messagingTemplate.convertAndSend("/sub/chat/" + channelId, new Message("chat", "ChatGPT", channelId, chatGptResponse));
    }

    private String callChatGptApi(String channelId, String userMessage) {
        // 이전 대화 내역을 가져옵니다.
        List<ChatHistory> previousMessages = chatService.getChatHistory(channelId);
        System.out.println(previousMessages);
        // 이전 대화 내용을 하나의 프롬프트로 결합합니다.
        String prompt = previousMessages.stream()
                .map(chatMessage -> chatMessage.getSender() + ": " + chatMessage.getMessage())
                .collect(Collectors.joining("\n"));
        prompt += "\nUser: " + userMessage + "\nChatGPT:";

        // ChatGPT 요청을 위한 객체 생성
        GptRequest gptRequest = new GptRequest("gpt-4o", prompt);

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + chatGptApiKey);
        headers.set("Content-Type", "application/json");

        // 요청을 HttpEntity로 감쌉니다.
        HttpEntity<GptRequest> requestEntity = new HttpEntity<>(gptRequest, headers);

        try {
            // ChatGPT API에 요청을 보내고 응답을 받습니다.
            ResponseEntity<GptResponse> responseEntity = restTemplate.exchange(
                    chatGptApiUrl + "/chat/completions",  // 올바른 URL 사용
                    HttpMethod.POST,
                    requestEntity,
                    GptResponse.class
            );

            // 응답이 성공적일 경우
            if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
                return responseEntity.getBody().getChoices().get(0).getMessage().getContent().trim();
            } else {
                throw new IOException("Unexpected response status: " + responseEntity.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error calling OpenAI API", e);
        }
    }

    @MessageMapping("/history")
    public void getChatHistory(Message message) {
        String channelId = message.getChannelId();
        List<ChatHistory> history = chatService.getChatHistory(channelId);

        // 클라이언트에 대화 내역을 전송
        for (ChatHistory chat : history) {
            messagingTemplate.convertAndSend("/sub/chat/" + channelId, new Message("history", chat.getSender(), channelId, chat.getMessage()));
        }
    }

    static class GptRequest {
        private String model;
        private List<Message> messages;

        public GptRequest(String model, String prompt) {
            this.model = model;
            this.messages = List.of(new Message("user", prompt));
        }

        // Getters and setters
        public String getModel() { return model; }
        public void setModel(String model) { this.model = model; }
        public List<Message> getMessages() { return messages; }
        public void setMessages(List<Message> messages) { this.messages = messages; }

        static class Message {
            private String role;
            private String content;

            public Message(String role, String content) {
                this.role = role;
                this.content = content;
            }

            // Getters and setters
            public String getRole() { return role; }
            public void setRole(String role) { this.role = role; }
            public String getContent() { return content; }
            public void setContent(String content) { this.content = content; }
        }
    }

    static class GptResponse {
        private List<Choice> choices;

        // Getters and setters
        public List<Choice> getChoices() { return choices; }
        public void setChoices(List<Choice> choices) { this.choices = choices; }

        static class Choice {
            private Message message;

            // Getters and setters
            public Message getMessage() { return message; }
            public void setMessage(Message message) { this.message = message; }

            static class Message {
                private String role;
                private String content;

                // Getters and setters
                public String getRole() { return role; }
                public void setRole(String role) { this.role = role; }
                public String getContent() { return content; }
                public void setContent(String content) { this.content = content; }
            }
        }
    }
}
