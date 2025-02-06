package com.babyloop.oauth2;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.stereotype.Service;

import com.babyloop.auth.security.JwtUtil;

import java.util.Collections;
import java.util.Map;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final JwtUtil jwtUtil;

    // JwtUtil 주입
    public CustomOAuth2UserService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
	
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String accessToken = userRequest.getAccessToken().getTokenValue();
 
        
        
        // 서비스 제공자에 따른 이메일을 추출합니다.
        String provider = userRequest.getClientRegistration().getClientName();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        OAuthAttributes oAuthAttributes = OAuthAttributes.of(provider, attributes);

        if (oAuthAttributes == null) {
            throw new IllegalArgumentException("Unknown provider: " + provider);
        }

        String jwtToken = jwtUtil.generateLoginToken(oAuthAttributes.getEmail());
        
        // 이메일 정보과 provider 정보를 함께 저장
        return new org.springframework.security.oauth2.core.user.DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                Map.of(
                	    "email", oAuthAttributes.getEmail(),
                	    "provider", oAuthAttributes.getProvider(),
                	    "providerId", oAuthAttributes.getProviderId(),
                	    "jwtToken", jwtToken
                ),"email"
        );
    }
}



