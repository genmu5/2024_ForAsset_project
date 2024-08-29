package com.example._2024_for_asset_spring.repository.spring.customer;

import com.example._2024_for_asset_spring.entity.spring.auth.Member;
import com.example._2024_for_asset_spring.entity.spring.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findById(Long id);
    List<ChatRoom> findAllByMember(Member member);
}
