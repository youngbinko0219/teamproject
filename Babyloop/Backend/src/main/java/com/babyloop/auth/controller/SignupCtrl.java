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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.repository.IMemberMapper;
import com.babyloop.auth.repository.MemberDTO;
import com.babyloop.jwt.JwtUtil;
import com.babyloop.utils.EmailSending;

@RestController
@RequestMapping("/auth")
public class SignupCtrl {

	//쿼리 인터페이스 가져오기
	@Autowired
	IMemberMapper memberDAO;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	//비밀번호 암호화
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	//트랜잭션 처리
	@Autowired
	TransactionTemplate transactionTemplate;
	

	//회원가입 Post
	@PostMapping("/signup")
	public Map<String,String> signup(
			@RequestBody MemberDTO memberDTO,
			@RequestHeader("Authorization") String token){
		
		Map<String,String> map = new HashMap<>();
		
        // "Bearer " 접두사 제거 후 실제 토큰 추출
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        } else {
            throw new RuntimeException("토큰 형식 오류");
        }
		
		//JWT가 유효하지 않을 때
		if(!jwtUtil.isTokenValid(token)) {
			throw new RuntimeException("유효하지 않은 토큰");
		}
		
		// token 풀기
		String emailToken = jwtUtil.extractClaims(token).getSubject();

        if (!emailToken.equals(memberDTO.getUser_email())) {
        	throw new RuntimeException("토큰의 이메일과 불일치");
        }
        
        //비밀번호 암호화
        String encryptedPassword = encoder.encode(memberDTO.getUser_pw());
		
        //트랜잭션
        try {
			transactionTemplate.execute(new TransactionCallbackWithoutResult() {
				
				@Override
				protected void doInTransactionWithoutResult(TransactionStatus status) {
					
					// 회원 등록
					memberDAO.signupMember(memberDTO, encryptedPassword);
					
					// 등급 등록
					memberDAO.signupGrade(memberDTO);
					
					map.put("message", "success");
				}
			});
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("에러", e);
		}

		return map;
	}
	

	@Autowired
	private EmailSending email;

	
	//이메일 인증 발송 Post
	@PostMapping("/email/send")
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
	public Map<String,String> checkid(@ModelAttribute MemberDTO memberDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			String result = memberDAO.idcheck(memberDTO);

			if(result == null) {
				map.put("message", "success");				
			}else {
				map.put("message", "error");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "error");
		}
		
		return map;
	}
		
}
