package com.example._2024_for_asset_spring.controller.customer;

import com.example._2024_for_asset_spring.dto.customer.SendMessageRequestDto;
import com.example._2024_for_asset_spring.entity.spring.chat.ChatMessage;
import com.example._2024_for_asset_spring.service.customer.ChatMessageService;
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
        chatMessageService.saveMessage(1L, sendMessageRequest.getSenderEmail(), sendMessageRequest.getContent());

        // Get GPT response and save it
        String gptResponse = chatMessageService.getChatGptResponse(1L, sendMessageRequest.getContent());
        ChatMessage gptMessage = chatMessageService.saveMessage(1L, "ChatGPT", gptResponse);

        return gptMessage;
    }
}
