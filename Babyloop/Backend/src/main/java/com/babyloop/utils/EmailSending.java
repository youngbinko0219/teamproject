package com.babyloop.utils;

import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailSending {
	
	private final JavaMailSender mailSender;
	private final SpringTemplateEngine templateEngine;
	
	@Value("${spring.mail.username}")
	private String from;
	
	
	 /**
     * 인증 이메일 발송
     *Thymeleaf 템플릿 사용
     *
     * @param userEmail 수신자 이메일 주소
     * @return 생성된 인증 코드
     */
	public String checkEmailSender(String userEmail) {
		
		//9자리 랜덤 코드
		String code = emailCode();
		
		try {
			MimeMessage m = mailSender.createMimeMessage();
			MimeMessageHelper h = new MimeMessageHelper(m,"UTF-8");
			
			//이메일 세팅
			h.setFrom(from);
			h.setTo(userEmail);
			h.setSubject("[BabyLoop 이메일 인증]");
			
			//템플릿에 주입할 코드
			Context context = new Context();
			context.setVariable("code",code);
			
			//이메일의 본문
			String emailContent = templateEngine.process("email",context);
			
			//본문 설정
			h.setText(emailContent, true);
			
			//이메일 발송
			mailSender.send(m);	
			return code;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	//비밀번호 찾기 이메일 발송
	public String pwEmailSender(String userEmail) {
		
		//9자리 랜덤 코드
		String code = emailCode();
		
		try {
			MimeMessage m = mailSender.createMimeMessage();
			MimeMessageHelper h = new MimeMessageHelper(m,"UTF-8");
			
			//이메일 세팅
			h.setFrom(from);
			h.setTo(userEmail);
			h.setSubject("[BabyLoop 이메일 인증]");
			
			//템플릿에 주입할 코드
			Context context = new Context();
			context.setVariable("code",code);
			
			//이메일의 본문
			String emailContent = templateEngine.process("passwordReset", context);
			
			//본문 설정
			h.setText(emailContent, true);
			
			//이메일 발송
			mailSender.send(m);	
			return code;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//이메일 인증 코드 생성
	private String emailCode() {
		Random rand = new Random();
		return String.format("%06d",rand.nextInt(1000000000));
	}
	
}
