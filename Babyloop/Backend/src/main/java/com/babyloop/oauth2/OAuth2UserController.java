package com.babyloop.oauth2;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/oauth2")
public class OAuth2UserController {

    @PostMapping("/user")
    public Map<String, String> getOAuth2User(@RequestHeader("Authorization") String authorizationHeader) {
        // Authorization 헤더에서 Bearer 토큰 추출
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("유효하지 않은 Authorization 헤더입니다.");
        }

        String token = authorizationHeader.substring(7);  // "Bearer " 부분을 제외한 토큰만 추출
        
        // 응답 객체 생성
        Map<String, String> response = new HashMap<>();
        response.put("message", "success");
        response.put("accessToken", token);

        return response;
    }
}
