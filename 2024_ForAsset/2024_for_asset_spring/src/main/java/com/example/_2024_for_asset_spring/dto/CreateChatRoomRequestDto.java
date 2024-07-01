package com.example._2024_for_asset_spring.dto;

public class CreateChatRoomRequestDto {
    private String memberEmail;
    private String topic;

    public CreateChatRoomRequestDto(String memberEmail, String topic) {
        this.memberEmail = memberEmail;
        this.topic = topic;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}
