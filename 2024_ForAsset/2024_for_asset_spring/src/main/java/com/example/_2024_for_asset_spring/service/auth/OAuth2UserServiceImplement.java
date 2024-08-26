package com.example._2024_for_asset_spring.service.auth;

import com.example._2024_for_asset_spring.entity.spring.auth.CustomOAuthUser;
import com.example._2024_for_asset_spring.entity.spring.auth.Member;
import com.example._2024_for_asset_spring.repository.spring.auth.MemberRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2UserServiceImplement.class);

    private final MemberRepository memberRepository;

    public OAuth2UserServiceImplement(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String oauthClientName = userRequest.getClientRegistration().getRegistrationId();

        System.out.println("getClientRegistration: "+userRequest.getClientRegistration());
        System.out.println("getAccessToken: "+userRequest.getAccessToken().getTokenValue());
        System.out.println("getAttributes: "+ super.loadUser(userRequest).getAttributes());
        String email = null;
        String oauth2AccessToken = userRequest.getAccessToken().getTokenValue();

        if (oauthClientName.equals("kakao")) {
            email = "kakao_" + oAuth2User.getAttributes().get("id");
        }

        // 이메일을 기반으로 기존 사용자가 있는지 확인
        Optional<Member> existingMember = memberRepository.findMemberByEmail(email);

        if (existingMember.isPresent()) {
            // 기존 사용자가 있는 경우 로그인 처리와 함께 accessToken을 업데이트함
            Member member = existingMember.get();
            member.setOauth2AccessToken(oauth2AccessToken);
            memberRepository.save(member);
            return new CustomOAuthUser(member.getEmail());
        } else {
            // 사용자가 없으면 새로 추가
            Member newMember = new Member(email, "KAKAO", oAuth2User.getAttributes().get("id").toString(),oauth2AccessToken);
            memberRepository.save(newMember);
            return new CustomOAuthUser(newMember.getEmail());
        }
    }

}
