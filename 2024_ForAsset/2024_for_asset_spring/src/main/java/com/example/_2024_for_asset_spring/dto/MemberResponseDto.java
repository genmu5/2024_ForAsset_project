package com.example._2024_for_asset_spring.dto;

import com.example._2024_for_asset_spring.entity.Member;
import com.example._2024_for_asset_spring.entity.Provider;
import com.example._2024_for_asset_spring.entity.Role;

import java.time.LocalDateTime;

public class MemberResponseDto {
    private String email;
    private String nickName;
    private Provider provider;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MemberResponseDto(String email, String nickName, Provider provider, Role role, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.email = email;
        this.nickName = nickName;
        this.provider = provider;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static MemberResponseDto from(Member member) {
        return new MemberResponseDto(
                member.getEmail(),
                member.getNickName(),
                member.getProvider(),
                member.getRole(),
                member.getCreatedAt(),
                member.getUpdatedAt()
        );
    }

    public String getEmail() {
        return email;
    }

    public String getNickName() {
        return nickName;
    }

    public Provider getProvider() {
        return provider;
    }

    public Role getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
