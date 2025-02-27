package com.babyloop.oauth2;


import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.babyloop.auth.repository.IMemberMapper;
import com.babyloop.auth.repository.MemberDTO;
import com.babyloop.jwt.JwtUtil;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final JwtUtil jwtUtil;
    private final IMemberMapper memberService;
    @Autowired
	IMemberMapper memberDAO;

    // Constructor 주입
    public CustomOAuth2UserService(JwtUtil jwtUtil, IMemberMapper memberService) {
        this.jwtUtil = jwtUtil;
        this.memberService = memberService;
    }

    @Override
    @Transactional
    public CustomOAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getClientName();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        OAuthAttributes oAuthAttributes = OAuthAttributes.of(provider, attributes);
        if (oAuthAttributes == null) {
            throw new IllegalArgumentException("알 수 없는 제공자입니다: " + provider);
        }

        String providerId = oAuthAttributes.getProviderId();
        String userEmail = oAuthAttributes.getUserEmail();
        String userName = oAuthAttributes.getUserName();

        // 소셜 ID로 이미 존재하는 회원을 조회
        Optional<MemberDTO> existingMember = memberService.findByProviderId(providerId);

        // 회원이 없으면 새로운 user_id 생성
        String userId = existingMember.map(MemberDTO::getUser_id)
                .orElse(provider + "_" + UUID.randomUUID().toString().replace("-", "").substring(0, 10));

        // JWT 토큰 생성
        String token = jwtUtil.generateSocialLoginToken(userId, userName, userEmail, provider);
        // 존재하지 않으면 새로운 회원 저장
        if (existingMember.isEmpty()) {
            // MemberDTO 객체 생성 시 created_at은 DB에서 자동 처리
        	MemberDTO newMember = new MemberDTO();
            newMember.setUser_id(userId);
            newMember.setUser_name(userName);
            newMember.setUser_email(userEmail);
            newMember.setProvider(provider);
            newMember.setProvider_id(providerId);     

            // 새로운 회원 저장
            memberService.loginSNSMember(newMember);
            
            // 새로운 회원 등급 저장
            memberDAO.signupGrade(newMember);
        }

        // CustomOAuth2User 반환
        return new CustomOAuth2User(userId, userName, userEmail, provider, providerId, token);
    }

}