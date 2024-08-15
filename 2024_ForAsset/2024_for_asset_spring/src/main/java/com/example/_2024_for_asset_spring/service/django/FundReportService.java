package com.example._2024_for_asset_spring.service.django;

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
import java.util.stream.Collectors;

@Service
public class FundReportService {

    @Value("${chatGptApiUrl}")
    private String chatGptApiUrl;

    @Value("${chatGptApiKey}")
    private String chatGptApiKey;

    private final RestTemplate restTemplate;

    public FundReportService() {
        this.restTemplate = new RestTemplate();
    }

    public String generateFundReport(String fundName, LocalDateTime startDate, LocalDateTime endDate, List<String> newsSummaries) throws IOException {
        // 1. 운용 보고 작성
        String operationReportPrompt = createOperationReportPrompt(fundName, startDate, endDate, newsSummaries);
        String operationReport = requestGptResponse(operationReportPrompt);

        // 2. 향후 운용 계획 작성
        String futurePlanPrompt = createFuturePlanPrompt(fundName, startDate, endDate, newsSummaries);
        String futurePlan = requestGptResponse(futurePlanPrompt);

        // 최종 보고서 형식으로 합치기
        return "펀드의 운용 보고서:\n" + operationReport + "\n\n향후 운용 계획:\n" + futurePlan;
    }

    private String requestGptResponse(String prompt) throws IOException {
        GptRequest gptRequest = new GptRequest("gpt-3.5-turbo", prompt);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + chatGptApiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<GptRequest> requestEntity = new HttpEntity<>(gptRequest, headers);
        ResponseEntity<GptResponse> responseEntity = restTemplate.exchange(
                chatGptApiUrl + "/chat/completions",
                HttpMethod.POST,
                requestEntity,
                GptResponse.class
        );

        if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
            return responseEntity.getBody().getChoices().get(0).getMessage().getContent().trim();
        } else {
            throw new IOException("Unexpected response status: " + responseEntity.getStatusCode());
        }
    }

    private String createOperationReportPrompt(String fundName, LocalDateTime startDate, LocalDateTime endDate, List<String> newsSummaries) {
        String articlesText = newsSummaries.stream().collect(Collectors.joining("\n"));

        return String.format(
                "펀드 이름: %s\n운용 기간: %s ~ %s\n관련 뉴스 요약:\n%s\n위 정보를 바탕으로 펀드의 운용 보고서를 작성해 주세요.",
                fundName, startDate, endDate, articlesText
        );
    }

    private String createFuturePlanPrompt(String fundName, LocalDateTime startDate, LocalDateTime endDate, List<String> newsSummaries) {
        String articlesText = newsSummaries.stream().collect(Collectors.joining("\n"));

        return String.format(
                "펀드 이름: %s\n운용 기간: %s ~ %s\n관련 뉴스 요약:\n%s\n위 정보를 바탕으로 펀드의 향후 운용 계획을 작성해 주세요.",
                fundName, startDate, endDate, articlesText
        );
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
