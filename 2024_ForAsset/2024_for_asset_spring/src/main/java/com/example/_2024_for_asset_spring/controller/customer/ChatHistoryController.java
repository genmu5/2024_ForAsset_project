package com.example._2024_for_asset_spring.controller.customer;

import com.example._2024_for_asset_spring.entity.spring.auth.Member;
import com.example._2024_for_asset_spring.entity.spring.chat.ChatHistory;
import com.example._2024_for_asset_spring.repository.spring.customer.ChatHistoryRepository;
import com.example._2024_for_asset_spring.repository.spring.auth.MemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatHistoryController {

    private final ChatHistoryRepository chatHistoryRepository;
    private final MemberRepository memberRepository;

    public ChatHistoryController(ChatHistoryRepository chatHistoryRepository, MemberRepository memberRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/chat-history")
    public List<ChatHistory> getChatHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 인증된 사용자의 이메일

        Member member = memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        return chatHistoryRepository.findByMember(member);
    }
}
