package com.example._2024_for_asset_spring.config;

import com.example._2024_for_asset_spring.jwt.CustomUserDetailService;
import com.example._2024_for_asset_spring.jwt.JwtAuthFilter;
import com.example._2024_for_asset_spring.jwt.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final CustomUserDetailService customUserDetailService;
    private final JwtUtil jwtUtil;

    //"/login", "/signUp", "/h2-console/**", "/api/**", "/chat/**",
    private static final String[] AUTH_WHITELIST = {
            "/**"
    };

    public SecurityConfig(CustomUserDetailService customUserDetailService, JwtUtil jwtUtil) {
        this.customUserDetailService = customUserDetailService;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable());
        http.cors(Customizer.withDefaults());

        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        // FormLogin, BasicHttp 비활성화
        http.formLogin((form) -> form.disable());
        http.httpBasic(AbstractHttpConfigurer::disable);

        // JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(new JwtAuthFilter(customUserDetailService, jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // H2 콘솔에 대한 프레임 옵션 허용
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        // 권한 규칙 작성
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(AUTH_WHITELIST).permitAll()
                .anyRequest().authenticated()
        );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
