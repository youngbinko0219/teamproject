package com.babyloop.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.member.IMemberService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/baby.loop/auth")
public class AuthCtrl {

	//쿼리 인터페이스 가져오기
	IMemberService memberDao;
	
	@Value("${my.reacthost}")
	private String reacthost;
	
	@GetMapping("/login")
	public void login(HttpServletResponse resp) throws IOException{
		resp.sendRedirect(reacthost
				+"/login");
	}
}
