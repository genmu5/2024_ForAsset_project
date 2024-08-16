package com.example._2024_for_asset_spring.jwt;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailProvider {

    private final JavaMailSender javaMailSender;

    public EmailProvider(final JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    private final String SUBJECT = "[For Asset Artificial Intelligence 서비스 인증 메일]";

    public boolean sendCertificationEmail(String email, String certificationNumber){
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            String htmlContent = getCertificationMessage(certificationNumber);

            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject(SUBJECT);
            mimeMessageHelper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);

        } catch (Exception exception){
            exception.printStackTrace();
            return false;
        }

        return true;
    }

    private String getCertificationMessage (String certificationNumber){
        String certificationMessage = "";
        certificationMessage += "<h1 style='text-align: center;>[For Asset Artificial Intelligence] 인증메일<h1>";
        certificationMessage += "<h3 style='text-align: center;>인증코드 : <strong style='font-size: 32px;'>" + certificationNumber + "</strong><h3>";
        return certificationMessage;
    }
}
