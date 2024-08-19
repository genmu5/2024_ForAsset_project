//package com.example._2024_for_asset_spring.entity.spring.chat;
//
//import com.example._2024_for_asset_spring.entity.spring.auth.Member;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Setter
//@Table(name="chat_message")
//public class ChatMessage {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "chat_room_id")
//    private ChatRoom chatRoom;
//
//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;
//
//    @Column(name = "content", columnDefinition = "TEXT")
//    private String content;
//
//    @Column(name = "created_at")
//    private LocalDateTime createdAt;
//
//    public ChatMessage(){
//    }
//
//    public ChatMessage(Long id, ChatRoom chatRoom, Member member, String content, LocalDateTime createdAt) {
//        this.id = id;
//        this.chatRoom = chatRoom;
//        this.member = member;
//        this.content = content;
//        this.createdAt = createdAt;
//    }
//}
