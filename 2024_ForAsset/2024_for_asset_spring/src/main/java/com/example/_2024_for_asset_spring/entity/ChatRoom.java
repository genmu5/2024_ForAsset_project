package com.example._2024_for_asset_spring.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "topic")
    private String topic;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    public ChatRoom() {
    }

    public ChatRoom(Long id, Member member, String topic, LocalDateTime createAt) {
        this.id = id;
        this.member = member;
        this.topic = topic;
        this.createAt = createAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}
