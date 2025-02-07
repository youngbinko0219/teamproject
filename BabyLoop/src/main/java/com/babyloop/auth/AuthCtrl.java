package com.babyloop.auth;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	//로그인 Post
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
	
	
	//회원가입 Post
	@PostMapping("/signup")
	public Map<String,String> signup(
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
			
			//JWT의 null 이면 fail
			if(!jwtUtil.isTokenValid(token)) {
				map.put("message", "fail");
				return map;
			}
			
			// token 풀기
			String emailToken = jwtUtil.extractClaims(token).getSubject();

	        if (!emailToken.equals(memberDTO.getUser_email())) {
	            map.put("message", "fail");
	            
	            return map;
	        }
			
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
	
	
	//JWT 토큰 존재 확인 Get
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
	
	
	//로그아웃 Post
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

	
	//이메일 인증 발송 Post
	@PostMapping("/emailSend")
	public Map<String,String> emailSend(@RequestBody MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			//이미 인증을 받은 이메일이 있으면 return
			String result = memberDAO.emailCheck(memberDTO);
			if(result!=null) {
				map.put("message", "equals");
				return map;
			}
			
			String code = email.checkEmailSender(memberDTO.getUser_email());
			
			// null 값이면 fail
	        if (code == null) {
	            map.put("message", "fail");
	            return map;
	        }
			
	        //이메일 인증용 JWT토큰
	        String token = jwtUtil.generateEmailToken(memberDTO.getUser_email());
		
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
	 
	
	//아이디 중복확인 체크 Get
	@GetMapping("/checkid")
	public Map<String,String> checkid(@RequestBody MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			String result = memberDAO.idcheck(memberDTO);

			if(result == null) {
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
	
	
	//아이디 찾기 Get
	@GetMapping("/search-id")
	public Map<String,String> searchId(@RequestBody MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			String result = memberDAO.idSearch(memberDTO);
			
			
			if(result == null) {
				map.put("message", "fail");				
			}else {
				//아이디 앞5글자만 공개
				String front = result.substring(0,5);
				String back = result.substring(5);
				back = back.replaceAll(".", "*");
				result = front+back;
				
				map.put("message", "success");
				map.put("user_id", result);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}
	
	
	//비밀번호 찾기 Post
	@PostMapping("/search-pw")
	public Map<String,String> search(@RequestBody MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			String result = memberDAO.pwSearch(memberDTO);

			if(result == null) {
				map.put("message", "fail");		
				
			}else {
				String code = email.pwEmailSender(memberDTO.getUser_email());
				
				//임시비밀번호 암호화
				String encryptedPassword = encoder.encode(code);
				
				int change = memberDAO.changePw(memberDTO,encryptedPassword);
				
				if(change==1) {
					map.put("message", "success");
				}else {
					map.put("message", "fail");
				}
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}
	
	
	//회원정보
	@GetMapping("/info/{user_id}")
	public List<MemberDTO> userInfo(@PathVariable("user_id") String userId){
		
		ArrayList<MemberDTO> result = memberDAO.memberInfo(userId);

		return result;
	}
}
