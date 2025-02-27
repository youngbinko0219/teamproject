package com.babyloop.auth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.threeten.bp.LocalDate;

import com.babyloop.auth.repository.IMemberMapper;
import com.babyloop.auth.repository.MemberDTO;
import com.babyloop.jwt.JwtUtil;
import com.babyloop.utils.EmailSending;

@RestController
@RequestMapping("/auth")
public class LoginCtrl {

	//쿼리 인터페이스 가져오기
	@Autowired
	IMemberMapper memberDAO;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	TransactionTemplate transaction;
	
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
				
				/*현재 날짜 가져오기*/
				LocalDate currentDate = LocalDate.now();
				/*사용자의 duration 날짜 확인*/
				String date = memberDAO.durationDate(memberDTO);
				
				/*날짜가 없으면 넘어감*/
				if(date != null) {
					
					/*현재날짜보다 빠르거나 같으면*/
					if(currentDate.isAfter(LocalDate.parse(date)) ||
							currentDate.isEqual(LocalDate.parse(date))) {
						/*로그인 못함*/
						map.put("message", "duration");
						return map;
					}
					
				}
				
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
	        	throw new RuntimeException("인증 토큰이 없음");
	        }
	    	
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	    
	}
	
	
	//아이디 찾기 Get
	@GetMapping("/search-id")
	public Map<String,String> searchId(@ModelAttribute MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			String result = memberDAO.idSearch(memberDTO);
			
			
			if(result == null) {
				throw new RuntimeException("아이디가 없음");			
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
	
	
	@Autowired
	private EmailSending email;
	
	
	//비밀번호 찾기 Post
	@PostMapping("/search-pw")
	public Map<String,String> search(@RequestBody MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			transaction.execute(new TransactionCallbackWithoutResult() {
				
				@Override
				protected void doInTransactionWithoutResult(TransactionStatus status) {
					
					String result = memberDAO.pwSearch(memberDTO);
					
					if(result == null) {
						throw new RuntimeException("비밀번호 찾지못함");
						
					}else {
						String code = email.pwEmailSender(memberDTO.getUser_email());
						
						//임시비밀번호 암호화
						String encryptedPassword = encoder.encode(code);
						
						memberDAO.changePw(memberDTO,encryptedPassword);
					
					}
				}
			});
				
				map.put("message", "success");				
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		return map;
	}
	
}
