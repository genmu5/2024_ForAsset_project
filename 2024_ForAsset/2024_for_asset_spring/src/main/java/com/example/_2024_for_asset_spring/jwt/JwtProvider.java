package com.example._2024_for_asset_spring.jwt;

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

    public String create(String email) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
                .compact();
        return jwt;
    }

    public String validate(String jwt) {
        String subject = null;

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try{
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            subject = claims.getSubject();

            return subject;

        } catch (Exception exception){
            exception.printStackTrace();
            return null;
        }
    }

    // 토큰에서 이메일 추출
    public String getEmailFromToken(String jwt) {
        Claims claims = getClaimsFromToken(jwt);
        return claims != null ? claims.getSubject() : null;
    }

    // 토큰에서 클레임 추출
    private Claims getClaimsFromToken(String jwt) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }
}

