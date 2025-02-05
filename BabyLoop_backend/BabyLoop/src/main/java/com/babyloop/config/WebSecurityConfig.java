package com.babyloop.config;


import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http
			.cors((cors)-> cors.disable())
			.csrf((csrf)-> csrf.disable())
			.authorizeHttpRequests((auth)->auth
				.requestMatchers("/").permitAll()
				.requestMatchers("/auth/**").permitAll()
				.anyRequest().authenticated()
			)
			
			.formLogin((form)-> form.disable());
				
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
