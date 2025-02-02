package com.babyloop.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.member.IMemberService;
import com.babyloop.auth.member.MemberDTO;


@RestController
@RequestMapping("/baby.loop/auth")
public class AuthCtrl {

	//쿼리 인터페이스 가져오기
	@Autowired
	IMemberService memberDAO;
	
	@PostMapping("/login")
	public Map<String,String> login(@RequestBody MemberDTO memberDTO){
		Map<String,String> map = new HashMap<>();
		
		try {
			int result = memberDAO.login(memberDTO);
			System.out.println(memberDTO.getUser_id());
			System.out.println(memberDTO.getUser_pw());
			
			if(result==1) {
				map.put("message", "success");
			}else {
				map.put("message", "fail");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}
}
