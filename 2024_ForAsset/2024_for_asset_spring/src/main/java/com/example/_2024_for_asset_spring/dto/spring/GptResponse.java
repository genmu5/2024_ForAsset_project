package com.example._2024_for_asset_spring.dto.spring;

import java.util.List;

public class GptResponse {
    private List<Choice> choices;

    // Getters and setters
    public List<Choice> getChoices() { return choices; }
    public void setChoices(List<Choice> choices) { this.choices = choices; }

    public static class Choice {
        private Message message;

        // Getters and setters
        public Message getMessage() { return message; }
        public void setMessage(Message message) { this.message = message; }

        public static class Message {
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
