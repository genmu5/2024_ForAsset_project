//package com.example._2024_for_asset_spring.controller.auth;
//
//import com.example._2024_for_asset_spring.dto.auth.request.*;
//import com.example._2024_for_asset_spring.dto.auth.response.*;
//import com.example._2024_for_asset_spring.service.auth.AuthService;
//import jakarta.validation.Valid;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/v1/auth")
//public class AuthController {
//
//    private final AuthService authService;
//
//    public AuthController(AuthService authService) {
//        this.authService = authService;
//    }
//
//    @PostMapping("/check-email")
//    public ResponseEntity<? super EmailCheckResponseDto> emailCheck(
//            @RequestBody @Valid EmailCheckRequestDto requestBody
//    ){
//        ResponseEntity<? super EmailCheckResponseDto> response  = authService.emailCheck(requestBody);
//        return response;
//    }
//
//    @PostMapping("/send-certification-email")
//    public ResponseEntity<? super EmailCertificationResponseDto> sendCertificationEmail(
//            @RequestBody @Valid EmailCertificationRequestDto requestBody
//    ){
//        ResponseEntity<? super EmailCertificationResponseDto> response = authService.emailCertification(requestBody);
//        return response;
//    }
//
//    @PostMapping("/check-certification-number")
//    public ResponseEntity<? super CertificationCheckResponseDto> checkCertificationNumber(
//            @RequestBody @Valid CertificationCheckRequestDto requestBody
//    ){
//        ResponseEntity<? super CertificationCheckResponseDto> response = authService.certificationCheck(requestBody);
//        return response;
//    }
//
//    @PostMapping("/sign-up")
//    public ResponseEntity<? super SignUpResponseDto> signUp(
//            @RequestBody @Valid SignUpRequestDto requestBody
//    ){
//        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
//        return response;
//    }
//
//    @PostMapping("/sign-in")
//    public ResponseEntity<? super SignInResponseDto> signIn(
//            @RequestBody @Valid SignInRequestDto requestBody
//    ){
//        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
//        return response;
//    }
//}
