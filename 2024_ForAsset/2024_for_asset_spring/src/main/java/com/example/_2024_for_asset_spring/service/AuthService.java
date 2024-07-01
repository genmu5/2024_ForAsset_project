package com.example._2024_for_asset_spring.service;

import com.example._2024_for_asset_spring.dto.JwtTokenDto;
import com.example._2024_for_asset_spring.dto.LoginRequestDto;
import com.example._2024_for_asset_spring.dto.MemberRequestDto;
import com.example._2024_for_asset_spring.dto.MemberResponseDto;
import com.example._2024_for_asset_spring.entity.Member;
import com.example._2024_for_asset_spring.jwt.JwtUtil;
import com.example._2024_for_asset_spring.repository.MemberRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(MemberRepository memberRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtUtil jwtUtil) {
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public MemberResponseDto signUp(MemberRequestDto memberRequestDto) {
        Member member = memberRequestDto.toMember(bCryptPasswordEncoder);
        return MemberResponseDto.from(memberRepository.save(member));
    }

    public JwtTokenDto login(LoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();
        Optional<Member> memberOpt = memberRepository.findByEmail(email);
        if (memberOpt.isPresent()){
            Member member = memberOpt.get();
            if(member == null) {
                throw new UsernameNotFoundException("not found by email");
            }
            if(!bCryptPasswordEncoder.matches(password, member.getPassword())) {
                throw new BadCredentialsException("bad credentials");
            }

            return jwtUtil.createJwtToken(member);
        }
        else return null;
    }
}
