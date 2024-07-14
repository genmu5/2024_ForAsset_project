package com.example._2024_for_asset_spring.service.auth;

import com.example._2024_for_asset_spring.common.CertificationNumber;
import com.example._2024_for_asset_spring.dto.auth.ResponseDto;
import com.example._2024_for_asset_spring.dto.auth.request.CertificationCheckRequestDto;
import com.example._2024_for_asset_spring.dto.auth.request.EmailCertificationRequestDto;
import com.example._2024_for_asset_spring.dto.auth.request.EmailCheckRequestDto;
import com.example._2024_for_asset_spring.dto.auth.response.CertificationCheckResponseDto;
import com.example._2024_for_asset_spring.dto.auth.response.EmailCertificationResponseDto;
import com.example._2024_for_asset_spring.dto.auth.response.EmailCheckResponseDto;
import com.example._2024_for_asset_spring.entity.auth.Certification;
import com.example._2024_for_asset_spring.entity.auth.Member;
import com.example._2024_for_asset_spring.jwt.EmailProvider;
import com.example._2024_for_asset_spring.repository.auth.CertificationRepository;
import com.example._2024_for_asset_spring.repository.auth.MemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImplement implements AuthService{

    private MemberRepository memberRepository;
    private EmailProvider emailProvider;
    private CertificationRepository certificationRepository;

    public AuthServiceImplement(MemberRepository memberRepository, EmailProvider emailProvider, CertificationRepository certificationRepository) {
        this.memberRepository = memberRepository;
        this.emailProvider = emailProvider;
        this.certificationRepository = certificationRepository;
    }

    @Override
    public ResponseEntity<? super EmailCheckResponseDto> emailCheck(EmailCheckRequestDto emailCheckRequestDto) {
        try {
            String email = emailCheckRequestDto.getEmail();
            System.out.println(email);
            Optional<Member> memberOptional = memberRepository.findMemberByEmail(email);
            if(memberOptional.isPresent()) {
                return EmailCheckResponseDto.duplicateEmail();
            }
        } catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCheckResponseDto.success();
    }

    @Override
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto emailCertificationRequestDto) {
        try{
            String email = emailCertificationRequestDto.getEmail();

            Optional<Member> memberOptional = memberRepository.findMemberByEmail(email);
            if(memberOptional.isPresent()) {
                return EmailCertificationResponseDto.duplicateEmail();
            }

            String certificationNumber = CertificationNumber.getCertificationNumber();

            boolean certificationEmailSend = emailProvider.sendCertificationEmail(email, certificationNumber);
            if(!certificationEmailSend) {
                return EmailCertificationResponseDto.mailSendFail();
            }

            Certification certification = new Certification(email, certificationNumber);
            certificationRepository.save(certification);

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCertificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CertificationCheckResponseDto> certificationCheck(CertificationCheckRequestDto certificationCheckRequestDto) {
        try {

            String email = certificationCheckRequestDto.getEmail();
            String certificationNumber = certificationCheckRequestDto.getCertificationNumber();
            Certification certification = null;

            Optional<Certification> certificationOptional = certificationRepository.findByMemberEmail(email);
            if(certificationOptional.isPresent()) {
                certification = certificationOptional.get();
            }

            boolean certificated = certification.getCertificationNumber().equals(certificationNumber) && certification.getMemberEmail().equals(email);
            if (!certificated) {
                return CertificationCheckResponseDto.certificationFail();
            }

        } catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CertificationCheckResponseDto.success();
    }
}
