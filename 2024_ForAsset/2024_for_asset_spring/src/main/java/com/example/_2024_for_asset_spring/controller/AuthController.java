package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.dto.JwtTokenDto;
import com.example._2024_for_asset_spring.dto.LoginRequestDto;
import com.example._2024_for_asset_spring.dto.MemberRequestDto;
import com.example._2024_for_asset_spring.dto.MemberResponseDto;
import com.example._2024_for_asset_spring.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.signUp(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test");
    }
}
