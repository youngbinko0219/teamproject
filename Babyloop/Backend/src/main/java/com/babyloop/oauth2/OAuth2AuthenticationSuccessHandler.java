package com.babyloop.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // 사용자 정보를 포함한 토큰 추출
        String token = oAuth2User.getToken();

        // 리디렉션할 URL에 토큰을 URL 파라미터로 추가
        String redirectUrl = "http://localhost:5173?accessToken=" + token;  // 프론트엔드 URL

        // 리디렉션 처리 (sendRedirect 없이 리디렉션 경로에 토큰을 포함)
        response.setStatus(HttpServletResponse.SC_FOUND);  // HTTP 302 - 리디렉션 상태 코드
        response.setHeader("Location", redirectUrl);  // 리디렉션할 URL
    }
}
