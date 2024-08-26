package com.example._2024_for_asset_spring.dto.customer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageResponseDto {
    private Long id;
    private String sender;
    private String message;

    public ChatMessageResponseDto(Long id, String sender, String message) {
        this.id = id;
        this.sender = sender;
        this.message = message;
    }
}
