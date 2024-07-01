package com.example._2024_for_asset_spring.jwt;

import com.example._2024_for_asset_spring.dto.JwtTokenDto;
import com.example._2024_for_asset_spring.entity.Member;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {
    private static final String BEARER_TYPE = "Bearer";
    private final SecretKey secretKey;
    private final long accessTokenExpire;
    private final long refreshTokenExpire;

    public JwtUtil(
            @Value("${spring.jwt.secret}") String secret,
            @Value("${spring.jwt.access_token_expiration_time}") long accessTokenExpire,
            @Value("${spring.jwt.refresh_token_expiration_time}") long refreshTokenExpire
    )
    {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
        this.accessTokenExpire = accessTokenExpire;
        this.refreshTokenExpire = refreshTokenExpire;
    }

    public JwtTokenDto createJwtToken(Member member){
        return createToken(member, accessTokenExpire, refreshTokenExpire);
    }

    private JwtTokenDto createToken(Member member, long accessTokenExpire, long refreshTokenExpire) {
        Claims claims = Jwts.claims();
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());
        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + accessTokenExpire);
        Date refreshTokenExpiresIn = new Date(now + refreshTokenExpire);

        String accessToken =
                Jwts.builder()
                        .claim("email", member.getEmail())
                        .claim("role", member.getRole())
                        .setExpiration(accessTokenExpiresIn)
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact();

        String refreshToken =
                Jwts.builder()
                        .setExpiration(refreshTokenExpiresIn)
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact();

        return new JwtTokenDto(BEARER_TYPE, accessToken, refreshToken, accessTokenExpiresIn.getTime());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT signature.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return false;
    }

    private Claims parseClaims(String token) {
        try{
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }

    public String getEmail(String token) {
        return parseClaims(token).get("email", String.class);
    }
}
