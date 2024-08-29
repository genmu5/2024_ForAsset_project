package com.example._2024_for_asset_spring.dto.customer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomResponseDto {

    private Long id;
    private String title;

    public ChatRoomResponseDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}

