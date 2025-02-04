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
			.csrf((csrf)-> csrf.disable())
			.authorizeHttpRequests((auth)->auth
				.requestMatchers("/").permitAll()
				.requestMatchers("/auth/**").permitAll()
				.anyRequest().authenticated()
			)
			
			.formLogin((form)-> form.disable());
			
			
		return http.build();
	}
}
