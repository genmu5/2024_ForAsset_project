package com.example._2024_for_asset_spring.service.customer;

import com.example._2024_for_asset_spring.entity.spring.chat.ChatHistory;
import com.example._2024_for_asset_spring.repository.spring.customer.ChatHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatHistoryRepository chatHistoryRepository;

    public ChatService(ChatHistoryRepository chatHistoryRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
    }

    public void saveMessage(String channelId, String sender, String message) {
        ChatHistory chatHistory = ChatHistory.builder()
                .channelId(channelId)
                .sender(sender)
                .message(message)
                .build();
        chatHistoryRepository.save(chatHistory);
    }
//
//    public List<ChatHistory> getChatHistory(String channelId) {
//        return chatHistoryRepository.findByChannelId(channelId);
//    }

    public List<ChatHistory> getChatHistory(String channelId) {
        return chatHistoryRepository.findByChannelIdOrderByIdAsc(channelId);
    }
}
