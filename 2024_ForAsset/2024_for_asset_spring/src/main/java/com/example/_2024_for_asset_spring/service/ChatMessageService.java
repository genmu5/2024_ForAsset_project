package com.example._2024_for_asset_spring.service;

import com.example._2024_for_asset_spring.entity.ChatMessage;
import com.example._2024_for_asset_spring.entity.ChatRoom;
import com.example._2024_for_asset_spring.entity.Member;
import com.example._2024_for_asset_spring.repository.ChatMessageRepository;
import com.example._2024_for_asset_spring.repository.ChatRoomRepository;
import com.example._2024_for_asset_spring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatMessageService {

    @Value("${chatGptApiUrl}")
    private String chatGptApiUrl;

    @Value("${chatGptApiKey}")
    private String chatGptApiKey;

    private final RestTemplate restTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository, MemberRepository memberRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.memberRepository = memberRepository;
        this.restTemplate = new RestTemplate();
    }

    public String getChatGptResponse(Long chatRoomId, String message) throws IOException {
        List<ChatMessage> previousMessages = chatMessageRepository.findByChatRoomId(chatRoomId);
        String prompt = previousMessages.stream()
                .map(chatMessage -> chatMessage.getMember().getNickName() + ": " + chatMessage.getContent())
                .collect(Collectors.joining("\n"));
        prompt += "\nUser: " + message + "\nChatGPT:";

        GptRequest gptRequest = new GptRequest("gpt-3.5-turbo", prompt);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + chatGptApiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<GptRequest> requestEntity = new HttpEntity<>(gptRequest, headers);

        try {
            ResponseEntity<GptResponse> responseEntity = restTemplate.exchange(
                    chatGptApiUrl + "/chat/completions",
                    HttpMethod.POST,
                    requestEntity,
                    GptResponse.class
            );

            if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
                System.out.println(responseEntity.getBody().getChoices().get(0).getMessage().getContent().trim());
                return responseEntity.getBody().getChoices().get(0).getMessage().getContent().trim();
            } else {
                throw new IOException("Unexpected response status: " + responseEntity.getStatusCode());
            }
        } catch (Exception e) {
            throw new IOException("Error calling OpenAI API", e);
        }
    }

    public ChatMessage saveMessage(Long chatRoomId, String senderEmail, String content) throws IOException {
        Optional<ChatRoom> chatRoomOpt = chatRoomRepository.findById(chatRoomId);
        Optional<Member> memberOpt = memberRepository.findByEmail(senderEmail);

        if (chatRoomOpt.isPresent()) {
            System.out.println("ChatRoom found: " + chatRoomOpt.get().getId());
        } else {
            System.out.println("ChatRoom not found with id: " + chatRoomId);
        }

        if (memberOpt.isPresent()) {
            System.out.println("Member found: " + memberOpt.get().getEmail());
        } else {
            System.out.println("Member not found with email: " + senderEmail);
        }

        if (chatRoomOpt.isPresent() && memberOpt.isPresent()) {
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setChatRoom(chatRoomOpt.get());
            chatMessage.setMember(memberOpt.get());
            chatMessage.setContent(content);
            chatMessage.setCreatedAt(LocalDateTime.now());
            chatMessageRepository.save(chatMessage);

            return chatMessage;
        } else {
            throw new IOException("Chat room or member not found.");
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
