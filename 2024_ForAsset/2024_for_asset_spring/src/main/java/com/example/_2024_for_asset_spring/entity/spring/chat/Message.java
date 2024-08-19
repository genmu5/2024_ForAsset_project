package com.example._2024_for_asset_spring.entity.spring.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String type;
    private String sender;
    private String channelId;
    private Object data;

    public void setSender(String sender) { this.sender = sender; }

    public void newConnect() { this.type = "new"; }
    public void closeConnect() { this.type = "close"; }
}
