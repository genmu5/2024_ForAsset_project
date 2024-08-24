package com.example._2024_for_asset_spring.controller.auth;

import com.example._2024_for_asset_spring.dto.auth.request.*;
import com.example._2024_for_asset_spring.dto.auth.response.*;
import com.example._2024_for_asset_spring.service.auth.AuthService;
import com.example._2024_for_asset_spring.service.auth.OAuth2UserServiceImplement;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final OAuth2UserServiceImplement oAuth2UserServiceImplement;

    public AuthController(AuthService authService, OAuth2UserServiceImplement oAuth2UserServiceImplement) {
        this.authService = authService;
        this.oAuth2UserServiceImplement = oAuth2UserServiceImplement;
    }

    @PostMapping("/check-email")
    public ResponseEntity<? super EmailCheckResponseDto> emailCheck(
            @RequestBody @Valid EmailCheckRequestDto requestBody
    ){
        ResponseEntity<? super EmailCheckResponseDto> response  = authService.emailCheck(requestBody);
        return response;
    }

    @PostMapping("/send-certification-email")
    public ResponseEntity<? super EmailCertificationResponseDto> sendCertificationEmail(
            @RequestBody @Valid EmailCertificationRequestDto requestBody
    ){
        ResponseEntity<? super EmailCertificationResponseDto> response = authService.emailCertification(requestBody);
        return response;
    }

    @PostMapping("/check-certification-number")
    public ResponseEntity<? super CertificationCheckResponseDto> checkCertificationNumber(
            @RequestBody @Valid CertificationCheckRequestDto requestBody
    ){
        ResponseEntity<? super CertificationCheckResponseDto> response = authService.certificationCheck(requestBody);
        return response;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto requestBody
    ){
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
            @RequestBody @Valid SignInRequestDto requestBody
    ){
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }
}
