package com.babyloop.oauth2;

import java.util.Map;

public class OAuthAttributes {

    private String email;
    private String provider; // Google or Naver 등
    private String providerId; 

    private OAuthAttributes(String email, String provider, String providerId) {
        this.email = email;
        this.provider = provider;
        this.providerId = providerId;
    }

    public static OAuthAttributes of(String registrationId, Map<String, Object> attributes) {
        if ("google".equalsIgnoreCase(registrationId)) {
            return ofGoogle(attributes);
        } else if ("naver".equalsIgnoreCase(registrationId)) {
            return ofNaver(attributes);
        }
        // 기본적으로 예외를 던지지 않고 Null 반환하는 방식으로 수정
        return null; // 알 수 없는 제공자가 오면 null 반환
    }

    // Google에서 받은 정보를 OAuthAttributes로 변환
    private static OAuthAttributes ofGoogle(Map<String, Object> attributes) {
        return new OAuthAttributes(
                (String) attributes.get("email"), // Google에서는 'email' 키로 이메일 정보가 옵니다.
                "google",
                (String) attributes.get("sub")
        );
    }

    // Naver에서 받은 정보를 OAuthAttributes로 변환
    private static OAuthAttributes ofNaver(Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return new OAuthAttributes(
                (String) response.get("email"),  // Naver에서 이메일 정보는 'response.email'로 제공됩니다.
                "naver",
                (String) response.get("id")
        );
    }

    public String getEmail() {
        return email;
    }

    public String getProvider() {
        return provider;
    }
    
    public String getProviderId() {
        return providerId;
    }
}


