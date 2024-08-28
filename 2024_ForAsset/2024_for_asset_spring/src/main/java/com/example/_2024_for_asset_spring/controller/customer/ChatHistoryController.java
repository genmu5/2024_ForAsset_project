package com.example._2024_for_asset_spring.controller.customer;

import com.example._2024_for_asset_spring.dto.customer.ChatMessageResponseDto;
import com.example._2024_for_asset_spring.dto.customer.ChatRoomResponseDto;
import com.example._2024_for_asset_spring.entity.spring.auth.Member;
import com.example._2024_for_asset_spring.entity.spring.chat.ChatHistory;
import com.example._2024_for_asset_spring.entity.spring.chat.ChatRoom;
import com.example._2024_for_asset_spring.repository.spring.customer.ChatHistoryRepository;
import com.example._2024_for_asset_spring.repository.spring.customer.ChatRoomRepository;
import com.example._2024_for_asset_spring.repository.spring.auth.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ChatHistoryController {

    private final ChatHistoryRepository chatHistoryRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    public ChatHistoryController(ChatHistoryRepository chatHistoryRepository, ChatRoomRepository chatRoomRepository, MemberRepository memberRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/chat-history")
    public List<ChatRoomResponseDto> getChatHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member memberPrincipal = (Member) authentication.getPrincipal();
        String email = memberPrincipal.getEmail();

        Member member = memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found for email: " + email));

        // ChatRoom 엔티티를 ChatRoomDto로 변환하여 반환
        return chatRoomRepository.findAllByMember(member).stream()
                .map(chatRoom -> new ChatRoomResponseDto(chatRoom.getId(), chatRoom.getTitle()))
                .collect(Collectors.toList());
    }

    @GetMapping("/chat-room/{chatRoomId}/messages")
    public List<ChatMessageResponseDto> getChatRoomMessages(@PathVariable Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found for ID: " + chatRoomId));

        return chatHistoryRepository.findByChatRoomOrderByIdAsc(chatRoom).stream()
                .map(chatHistory -> new ChatMessageResponseDto(chatHistory.getId(), chatHistory.getSender(), chatHistory.getMessage()))
                .collect(Collectors.toList());
    }

    @PutMapping("/chat-room/{chatRoomId}/title")
    public ChatRoomResponseDto updateChatRoomTitle(@PathVariable Long chatRoomId, @RequestBody String newTitle) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found for ID: " + chatRoomId));

        chatRoom.setTitle(newTitle);
        chatRoomRepository.save(chatRoom);

        return new ChatRoomResponseDto(chatRoom.getId(), chatRoom.getTitle());
    }

    @DeleteMapping("/chat-room/{chatRoomId}")
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChatRoom(@PathVariable Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found for ID: " + chatRoomId));

        chatHistoryRepository.deleteAllByChatRoom(chatRoom);
        chatRoomRepository.delete(chatRoom);
    }

    @PostMapping("/new-chat")
    public ChatRoom createNewChatRoom() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member memberPrincipal = (Member) authentication.getPrincipal();
        System.out.println(memberPrincipal.getEmail());
        String email = memberPrincipal.getEmail();

        Member member = memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // 새로운 채팅방 생성
        ChatRoom newChatRoom = new ChatRoom();
        newChatRoom.setTitle("New Chat");
        newChatRoom.setMember(member);

        return chatRoomRepository.save(newChatRoom);
    }
}
