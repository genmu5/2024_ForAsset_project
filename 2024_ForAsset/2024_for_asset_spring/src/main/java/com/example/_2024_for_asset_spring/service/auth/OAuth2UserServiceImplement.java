package com.example._2024_for_asset_spring.service.auth;

import com.example._2024_for_asset_spring.entity.auth.CustomOAuthUser;
import com.example._2024_for_asset_spring.entity.auth.Member;
import com.example._2024_for_asset_spring.repository.auth.MemberRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public OAuth2UserServiceImplement(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String oauthClientName = userRequest.getClientRegistration().getRegistrationId();

        Member member = null;
        String email = "email@email.com";

        if(oauthClientName.equals("kakao")){
            email = "kakao_" + oAuth2User.getAttributes().get("id");
            member = new Member(email, "KAKAO", oAuth2User.getAttributes().get("id").toString());
        }

        memberRepository.save(member);

        return new CustomOAuthUser(email);
    }
}
