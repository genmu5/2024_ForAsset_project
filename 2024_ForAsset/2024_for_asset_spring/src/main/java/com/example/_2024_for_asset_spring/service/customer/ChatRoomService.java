//package com.example._2024_for_asset_spring.service.customer;
//
//import com.example._2024_for_asset_spring.entity.spring.chat.ChatRoom;
//import com.example._2024_for_asset_spring.entity.spring.auth.Member;
//import com.example._2024_for_asset_spring.repository.spring.customer.ChatRoomRepository;
//import com.example._2024_for_asset_spring.repository.spring.auth.MemberRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.Optional;
//
//@Service
//public class ChatRoomService {
//
//    private final ChatRoomRepository chatRoomRepository;
//    private final MemberRepository memberRepository;
//
//    public ChatRoomService(ChatRoomRepository chatRoomRepository, MemberRepository memberRepository) {
//        this.chatRoomRepository = chatRoomRepository;
//        this.memberRepository = memberRepository;
//    }
//
//    public ChatRoom createChatRoom(String memberEmail, String topic) {
//        Optional<Member> memberOpt = memberRepository.findMemberByEmail(memberEmail);
//
//        if (memberOpt.isPresent()) {
//            ChatRoom chatRoom = new ChatRoom();
//            chatRoom.setMember(memberOpt.get());
//            chatRoom.setTopic(topic);
//            chatRoom.setCreateAt(LocalDateTime.now());
//
//            return chatRoomRepository.save(chatRoom);
//        } else {
//            return null;
//        }
//    }
//}
