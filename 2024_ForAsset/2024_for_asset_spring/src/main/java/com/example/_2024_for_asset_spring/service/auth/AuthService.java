package com.example._2024_for_asset_spring.service.auth;

import com.example._2024_for_asset_spring.dto.auth.request.*;
import com.example._2024_for_asset_spring.dto.auth.response.*;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super EmailCheckResponseDto> emailCheck(EmailCheckRequestDto emailCheckRequestDto);
    ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto emailCertificationRequestDto);
    ResponseEntity<? super CertificationCheckResponseDto> certificationCheck(CertificationCheckRequestDto certificationCheckRequestDto);
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto signUpRequestDto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto signInRequestDto);
}
