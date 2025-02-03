package com.babyloop.auth;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Value("#{myprops['my.reacthost']}")
	private String react;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http
			.csrf((csrf)->csrf.disable())
			
			//요청 권한 설정
			.authorizeHttpRequests(auth->auth
				//지정 경로는 로그인없이 허용
				.requestMatchers("/","/oauth2/**").permitAll()
				.anyRequest().authenticated()
			)
			// 로그인 폼 설정
			.formLogin(form->form
				.loginPage(react+"/login")
				//로그인 처리하는 경로
				.loginProcessingUrl("/auth/login")
				//이동은 React에서 처리
//			)
//			.oauth2Login(oauth2->oauth2
//				//로그인 성공시 이동 페이지
//				.defaultSuccessUrl(react+"/login")
			);
		
		return http.build();
	}

}
