package com.example._2024_for_asset_spring.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class AssetReport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "fund_id")
    private Fund fund;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    public AssetReport() {}

    public AssetReport(Long id, Member member, Fund fund, String content, LocalDateTime created_at) {
        this.id = id;
        this.member = member;
        this.fund = fund;
        this.content = content;
        this.created_at = created_at;
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

    public Fund getFund() {
        return fund;
    }

    public void setFund(Fund fund) {
        this.fund = fund;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
