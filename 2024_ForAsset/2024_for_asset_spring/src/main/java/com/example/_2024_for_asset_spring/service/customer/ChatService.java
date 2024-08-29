package com.example._2024_for_asset_spring.service.customer;

import com.example._2024_for_asset_spring.entity.spring.chat.ChatHistory;
import com.example._2024_for_asset_spring.entity.spring.chat.ChatRoom;
import com.example._2024_for_asset_spring.repository.spring.customer.ChatHistoryRepository;
import com.example._2024_for_asset_spring.repository.spring.customer.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final ChatRoomRepository chatRoomRepository;

    public ChatService(ChatHistoryRepository chatHistoryRepository, ChatRoomRepository chatRoomRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    public Optional<ChatRoom> findOrCreateChatRoom(Long channelId) {
        return chatRoomRepository.findById(channelId);
    }

    public void saveMessage(ChatRoom chatRoom, String sender, String message) {
        ChatHistory chatHistory = new ChatHistory();
        chatHistory.setChatRoom(chatRoom);
        chatHistory.setSender(sender);
        chatHistory.setMessage(message);
        chatHistoryRepository.save(chatHistory);
    }

    public List<ChatHistory> getChatHistory(ChatRoom chatRoom) {
        return chatHistoryRepository.findByChatRoomOrderByIdAsc(chatRoom);
    }
}
