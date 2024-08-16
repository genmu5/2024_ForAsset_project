package com.example._2024_for_asset_spring.repository.spring.auth;

import com.example._2024_for_asset_spring.entity.spring.auth.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findMemberByEmail(String email);
}
