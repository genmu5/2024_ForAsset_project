package com.example._2024_for_asset_spring.service.auth;

import com.example._2024_for_asset_spring.dto.auth.request.CertificationCheckRequestDto;
import com.example._2024_for_asset_spring.dto.auth.request.EmailCertificationRequestDto;
import com.example._2024_for_asset_spring.dto.auth.request.EmailCheckRequestDto;
import com.example._2024_for_asset_spring.dto.auth.response.CertificationCheckResponseDto;
import com.example._2024_for_asset_spring.dto.auth.response.EmailCertificationResponseDto;
import com.example._2024_for_asset_spring.dto.auth.response.EmailCheckResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super EmailCheckResponseDto> emailCheck(EmailCheckRequestDto emailCheckRequestDto);
    ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto emailCertificationRequestDto);
    ResponseEntity<? super CertificationCheckResponseDto> certificationCheck(CertificationCheckRequestDto certificationCheckRequestDto);
}
