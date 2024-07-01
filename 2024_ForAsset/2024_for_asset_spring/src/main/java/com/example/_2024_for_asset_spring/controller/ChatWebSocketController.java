package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.dto.SendMessageRequestDto;
import com.example._2024_for_asset_spring.entity.ChatMessage;
import com.example._2024_for_asset_spring.service.ChatMessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
public class ChatWebSocketController {

    private final ChatMessageService chatMessageService;

    public ChatWebSocketController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chatroom/1")
    public ChatMessage sendMessage(SendMessageRequestDto sendMessageRequest) throws IOException {
        // Save user message
        ChatMessage userMessage = chatMessageService.saveMessage(1L, sendMessageRequest.getSenderEmail(), sendMessageRequest.getContent());

        // Get GPT response and save it
        String gptResponse = chatMessageService.getChatGptResponse(1L, sendMessageRequest.getContent());
        ChatMessage gptMessage = chatMessageService.saveMessage(1L, "ChatGPT", gptResponse);

        return gptMessage;
    }
}
