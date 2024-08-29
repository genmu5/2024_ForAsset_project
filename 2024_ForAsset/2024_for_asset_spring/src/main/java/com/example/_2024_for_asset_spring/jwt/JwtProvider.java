package com.example._2024_for_asset_spring.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${spring.jwt.secret}")
    private String secretKey;

    // JWT 생성 메서드
    public String create(String email) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); // 1시간 유효한 토큰 생성
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
    }

    // JWT 유효성 검증 및 이메일 반환 메서드
    public String validate(String jwt) {
        try {
            Claims claims = getClaimsFromToken(jwt);
            return claims.getSubject(); // JWT의 subject(이메일) 반환

        } catch (ExpiredJwtException e) {
            System.out.println("JWT가 만료되었습니다.");
            // 만료된 토큰에 대한 특별한 처리 필요 시 여기서 처리
            throw e; // 필요에 따라 예외를 다시 던지거나, null을 반환하여 만료된 상태를 알릴 수 있음
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 토큰에서 이메일 추출 메서드
    public String getEmailFromToken(String jwt) {
        Claims claims = getClaimsFromToken(jwt);
        return claims != null ? claims.getSubject() : null;
    }

    // JWT에서 Claims(클레임) 추출 메서드
    private Claims getClaimsFromToken(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (ExpiredJwtException e) {
            System.out.println("JWT가 만료되었습니다.");
            throw e; // 만료된 JWT의 경우 예외를 다시 던질 수 있음
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
