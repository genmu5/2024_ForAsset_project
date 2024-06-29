package com.example._2024_for_asset_spring.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class ManagerChatService {

    private final WebClient webClient;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model.name}")
    private String modelName;

    public ManagerChatService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    public Mono<String> getGptResponse(String prompt) {
        return webClient.post()
                .uri("/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(new GptRequest(prompt, modelName))
                .retrieve()
                .bodyToMono(GptResponse.class)
                .map(GptResponse::getResponse)
                .doOnError(WebClientResponseException.class, e -> {
                    // 자세한 로그 추가
                    System.err.println("Error during API call: " + e.getMessage());
                    System.err.println("Response body: " + e.getResponseBodyAsString());
                })
                .onErrorResume(WebClientResponseException.class, e -> {
                    return Mono.just("API 호출 중 오류가 발생했습니다.");
                });
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    static class GptRequest {
        @JsonProperty("model")
        private final String model;

        @JsonProperty("messages")
        private final Message[] messages;

        public GptRequest(String prompt, String model) {
            this.model = model;
            this.messages = new Message[]{ new Message("user", prompt) };
        }

        @JsonInclude(JsonInclude.Include.NON_NULL)
        static class Message {
            @JsonProperty("role")
            private final String role;
            @JsonProperty("content")
            private final String content;

            public Message(String role, String content) {
                this.role = role;
                this.content = content;
            }
        }
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    static class GptResponse {
        @JsonProperty("choices")
        private Choice[] choices;

        public String getResponse() {
            if (choices != null && choices.length > 0) {
                return choices[0].message.content;
            }
            return "API 응답이 올바르지 않습니다.";
        }

        @JsonInclude(JsonInclude.Include.NON_NULL)
        static class Choice {
            @JsonProperty("message")
            private Message message;

            @JsonInclude(JsonInclude.Include.NON_NULL)
            static class Message {
                @JsonProperty("role")
                private String role;
                @JsonProperty("content")
                private String content;
            }
        }
    }
}
