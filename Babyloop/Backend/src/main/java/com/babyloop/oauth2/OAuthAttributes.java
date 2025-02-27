package com.babyloop.oauth2;

import java.util.Map;

public class OAuthAttributes {

	private String userName;
    private String userEmail;
    private String provider; // Google or Naver 등
    private String providerId; 

    private OAuthAttributes(String userName, String userEmail, String provider, String providerId) {
        this.userName = userName;
    	this.userEmail = userEmail;
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
        		(String) attributes.get("name"),      // 사용자 이름 (name)
                (String) attributes.get("email"),     // 이메일
                "google",                             // 제공자 (google)
                (String) attributes.get("sub")        // 사용자 고유 ID (sub)
        );
    }

    // Naver에서 받은 정보를 OAuthAttributes로 변환
    private static OAuthAttributes ofNaver(Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return new OAuthAttributes(
        		(String) response.get("name"),       // 사용자 이름 (name)
                (String) response.get("email"),      // 이메일
                "naver",                             // 제공자 (naver)
                (String) response.get("id")  		 // 사용자 고유 ID (id)
        );
    }

    public String getUserName() {
        return userName;
    }
    
    public String getUserEmail() {
        return userEmail;
    }

    public String getProvider() {
        return provider;
    }
    
    public String getProviderId() {
        return providerId;
    }
}