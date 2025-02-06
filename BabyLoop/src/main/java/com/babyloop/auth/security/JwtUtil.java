package com.babyloop.auth.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private static final String SECRET = "babyloop_secret_key_babyloop_secret_key_babyloop_secret_key";
	private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());


    //JWT 생성 (로그인 시 사용)
    public String generateLoginToken(String user_id) {
        return Jwts.builder()
                .setSubject(user_id)
                //발급 시간 설정
                .setIssuedAt(new Date())
                //24시간 유효
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
    
    
    //JWT 생성 (email 인증 시 사용)
    public String generateEmailToken(String user_id) {
        return Jwts.builder()
                .setSubject(user_id)
                //발급 시간 설정
                .setIssuedAt(new Date())
                //3분 유효
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 3))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
    
  //JWT 생성 (액세스 토큰 기반)
    public String generateJwtFromAccessToken(String accessToken, String user_id, String provider) {
        return Jwts.builder()
                .setSubject(user_id)
                .claim("accessToken", accessToken)
                .claim("provider", provider)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))  // 24시간 유효
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
    
    
    //JWT에서 사용자 ID 추출
    public String extractUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    

    //JWT 유효성 검증
    public boolean isTokenValid(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) 
                    .build()
                    .parseClaimsJws(token);
            return claims.getBody().getExpiration().after(new Date());
        } catch (Exception e) {
        	// 유효하지 않은 토큰
            return false; 
        }
    }
    
    
    //JWT에서 Claims(페이로드) 추출
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) //서명 키 설정
                .build()
                .parseClaimsJws(token)
                .getBody(); //JWT의 Claims(페이로드) 반환
    }
}


