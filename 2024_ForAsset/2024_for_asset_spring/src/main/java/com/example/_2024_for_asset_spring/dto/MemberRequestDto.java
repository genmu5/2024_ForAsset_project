package com.example._2024_for_asset_spring.dto;

import com.example._2024_for_asset_spring.entity.Member;
import com.example._2024_for_asset_spring.entity.Provider;
import com.example._2024_for_asset_spring.entity.Role;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

public class MemberRequestDto {
    private String email;
    private String password;
    private String nickName;
    private String provider;
    private String role;

    public MemberRequestDto(String email, String password, String nickName, String provider, String role) {
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.provider = provider;
        this.role = role;
    }

    public Member toMember(PasswordEncoder passwordEncoder) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        member.setNickName(nickName);
        member.setProvider(Provider.LOCAL);
        member.setRole(Role.USER);
        member.setCreatedAt(LocalDateTime.now());
        member.setUpdatedAt(LocalDateTime.now());
        return member;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNickName() {
        return nickName;
    }

    public String getProvider() {
        return provider;
    }

    public String getRole() {
        return role;
    }
}
