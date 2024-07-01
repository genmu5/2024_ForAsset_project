package com.example._2024_for_asset_spring.dto;

public class SendMessageRequestDto {
    private String content;
    private String senderEmail;

    public SendMessageRequestDto(String content, String senderEmail) {
        this.content = content;
        this.senderEmail = senderEmail;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }
}
