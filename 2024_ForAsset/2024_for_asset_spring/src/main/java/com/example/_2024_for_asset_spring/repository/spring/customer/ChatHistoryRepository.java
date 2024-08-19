package com.example._2024_for_asset_spring.repository.spring.customer;

import com.example._2024_for_asset_spring.entity.spring.chat.ChatHistory;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Primary
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    List<ChatHistory> findByChannelId(String channelId);
    List<ChatHistory> findByChannelIdOrderByIdAsc(String channelId);
}
