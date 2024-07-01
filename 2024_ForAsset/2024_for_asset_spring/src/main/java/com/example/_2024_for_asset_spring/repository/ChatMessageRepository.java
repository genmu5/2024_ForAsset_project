package com.example._2024_for_asset_spring.repository;

import com.example._2024_for_asset_spring.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatRoomId(Long chatRoomId);
}
