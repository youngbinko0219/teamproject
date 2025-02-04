package com.babyloop.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.member.IMemberService;
import com.babyloop.auth.member.MemberDTO;
import com.babyloop.auth.smtp.EmailSending;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/auth")
public class AuthCtrl {

	//쿼리 인터페이스 가져오기
	@Autowired
	IMemberService memberDAO;
	
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	//로그인
	@PostMapping("/login")
	public Map<String,String> login(@RequestBody MemberDTO memberDTO,
									HttpSession session){
		
		Map<String,String> map = new HashMap<>();
		
		//비밀번호 암호화
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		try {	
			String encryptedPassword = memberDAO.login(memberDTO);
			
			if(encryptedPassword != null &&
				encoder.matches(memberDTO.getUser_pw(),
				encryptedPassword)) {
				
				//세션 저장
				session.setAttribute("user", memberDTO.getUser_id());
				//성공 메시지
				map.put("message", "success");
			}else {
				//실패 메시지
				map.put("message", "fail");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		return map;
	}
	
	
	//회원가입
	@PostMapping("/signup")
	public Map<String,String> signup(@RequestBody MemberDTO memberDTO){
		
		Map<String,String> map = new HashMap<>();
		
		try {
			//비밀번호 암호화
			String encryptedPassword = encoder.encode(memberDTO.getUser_pw());
			
			int result = memberDAO.register(memberDTO,encryptedPassword);
			
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
	
	
	//세션 확인
	@GetMapping("/session")
	public Map<String, String> checkSession(HttpSession session) {
	    Map<String, String> map = new HashMap<>();
	    Object userObj = session.getAttribute("user");

	    try {
	    	if (userObj != null) {
	    		String user = userObj.toString();
	    		
	    		map.put("message", "success");
	    		map.put("user_id", user);
	    	} else {
	    		map.put("message", "null");
	    	}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
	    return map;
	}
	
	
	//로그아웃
	@PostMapping("/logout")
	public Map<String, String> logout(HttpSession session) {
	    Map<String, String> map = new HashMap<>();
	    
	    try {
	    	session.removeAttribute("user"); // "user" 속성만 삭제
	    	map.put("message", "success");	
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
	    
	    return map;
	}

	
	@Autowired
	EmailSending email;

	//이메일 발송
	@PostMapping("/emailSend")
	public Map<String,String> emailSend(HttpSession session,
			String userEmail){
		Map<String, String> map = new HashMap<>();
		
		
		try {
			String code = email.myEmailSender(session, userEmail);
			
			session.setAttribute("code", code);
			session.setAttribute("userEmail", userEmail);
		
			map.put("message", "success");
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}
	
}
