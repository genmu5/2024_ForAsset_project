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
//@Table(name = "chat_room")
//public class ChatRoom {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;
//
//    @Column(name = "topic")
//    private String topic;
//
//    @Column(name = "create_at")
//    private LocalDateTime createAt;
//
//    public ChatRoom() {
//    }
//
//    public ChatRoom(Long id, Member member, String topic, LocalDateTime createAt) {
//        this.id = id;
//        this.member = member;
//        this.topic = topic;
//        this.createAt = createAt;
//    }
//}
