package com.babyloop.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.member.IMemberService;
import com.babyloop.auth.member.MemberDTO;
import com.babyloop.auth.security.JwtUtil;
import com.babyloop.auth.smtp.EmailSending;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/auth")
public class AuthCtrl {

	//쿼리 인터페이스 가져오기
	@Autowired
	IMemberService memberDAO;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	//비밀번호 암호화
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	//로그인
	@PostMapping("/login")
	public Map<String,String> login(@RequestBody MemberDTO memberDTO){
		
		Map<String,String> map = new HashMap<>();
		
		try {	
			String encryptedPassword = memberDAO.login(memberDTO);
			
			if(encryptedPassword != null &&
				encoder.matches(memberDTO.getUser_pw(),
				encryptedPassword)) {
				
				//JWT 발급
				String token = jwtUtil.generateLoginToken(memberDTO.getUser_id());
				
				//성공 메시지
				map.put("message", "success");
				map.put("token", token);
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
	public Map<String,String> signup(HttpSession session,
			@RequestBody MemberDTO memberDTO,
			@RequestHeader("Authorization") String token){
		
		Map<String,String> map = new HashMap<>();
		
		try {
	        // "Bearer " 접두사 제거 후 실제 토큰 추출
	        if (token.startsWith("Bearer ")) {
	            token = token.substring(7);
	        } else {
	            map.put("message", "fail");
	            return map;
	        }
			
			//이메일 null 이거나 JWT의 일치하지않으면 fail
			if(!jwtUtil.isTokenValid(token)) {
				map.put("message", "fail");
				return map;
			}
			
			// token 풀기
			String emailToken = jwtUtil.extractClaims(token).getSubject();
			
			//세션가져오기
	        String sessionCode = (String) session.getAttribute("code");
	        String sessionEmail = (String) session.getAttribute("user_email");

	        if (!emailToken.equals(sessionEmail) || sessionCode == null) {
	            map.put("message", "fail");
	            return map;
	        }
			
			//비밀번호 암호화
			String encryptedPassword = encoder.encode(memberDTO.getUser_pw());
			
			int result = memberDAO.register(memberDTO,encryptedPassword);
			
			if(result==1) {
				map.put("message", "success");
				
	            //세션 삭제
	            session.removeAttribute("code");
	            session.removeAttribute("user_email");
			}else {
				map.put("message", "fail");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}
	
	
	//JWT 토큰 존재 확인
	@GetMapping("/jwtcheck")
	public Map<String, String> jwtCheck(@RequestHeader("Authorization") String token) {
	    Map<String, String> map = new HashMap<>();

	    try {
	        // 토큰이 없는 경우
	        if (token == null || token.isEmpty()) {
	            map.put("message", "fail");
	            return map;
	        }
	    	
	    	//접두어 제거
	        if (token.startsWith("Bearer ")) {
	            token = token.substring(7);
	        } else {
	            map.put("message", "fail");
	            return map;
	        }
	    	
	        // JWT 유효성 검증
	        if (!jwtUtil.isTokenValid(token)) {
	            map.put("message", "fail");
	            return map;
	        }
	        
	        // 토큰에서 사용자 ID 추출
	        String userId = jwtUtil.extractUserId(token);

	    	map.put("message", "success");
	    	map.put("user_id", userId);
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
	    return map;
	}
	
	
	//로그아웃
	@PostMapping("/logout")
	public Map<String, String> logout(@RequestHeader(value = "Authorization", required = false) String token) {
	    Map<String, String> map = new HashMap<>();
	    
	    try {
	        // 토큰이 없는 경우
	        if (token == null || token.isEmpty()) {
	            map.put("message", "success");	
	            return map;
	        }else {
	        	map.put("message", "fail");
	        }
	    	
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
	    
	    return map;
	}

	
	@Autowired
	private EmailSending email;

	//이메일 발송
	@PostMapping("/emailSend")
	public Map<String,String> emailSend(HttpSession session,
			@RequestParam("user_email") String user_email){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			String code = email.myEmailSender(user_email);
			
			// null 값이면 fail
	        if (code == null) {
	            map.put("message", "fail");
	            return map;
	        }
			
	        //이메일 인증용 JWT토큰
	        String token = jwtUtil.generateEmailToken(user_email);
	        
	        //인증번호 세션에 저장
			session.setAttribute("code", code);
			session.setAttribute("user_email", user_email);
		
			//JSON형식
			map.put("token", token);
			map.put("code", code);
			map.put("message", "success");
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}

}
