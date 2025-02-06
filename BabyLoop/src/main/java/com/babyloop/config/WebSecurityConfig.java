package com.babyloop.config;


import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.babyloop.oauth2.CustomOAuth2UserService;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	
	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http
	    .cors(cors -> cors.disable())  // CORS 비활성화
	    .csrf(csrf -> csrf.disable())  // CSRF 비활성화
	    .authorizeHttpRequests(auth -> 
	        auth
	            .requestMatchers("/", "/auth/**").permitAll()  // 공개된 URL
	            .anyRequest().authenticated()  // 나머지 URL은 인증 필요
	    )
	    .oauth2Login(oauth2Login -> 
	        oauth2Login
	            .userInfoEndpoint(userInfoEndpoint -> 
	                userInfoEndpoint.userService(customOAuth2UserService)  // OAuth2 사용자 정보 처리
	            )
	    )
	    .formLogin(form -> form.disable());  // 폼 로그인 비활성화

		return http.build();
	}
	
	//CORS 설정 추가
	@Bean
	public CorsFilter corsFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:5174"));
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    source.registerCorsConfiguration("/**", config);
	    return new CorsFilter(source);
	}

}
