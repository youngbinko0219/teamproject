package com.babyloop.auth.smtp;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.babyloop.auth.security.JwtUtil;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailSending {
	
	private final JavaMailSender mailSender;
	
	@Value("${spring.mail.username}")
	private String from;
	
	
	//인증 이메일 발송
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
			
			//이메일의 본문
			String emailContent = "<html><body style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6;\">"
			        + "<div style=\"width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;\">"
			        + "<h2 style=\"color: #4CAF50; text-align: center;\">이메일 인증</h2>"
			        + "<p style=\"font-size: 16px; text-align: center;\">안녕하세요,</p>"
			        + "<p style=\"font-size: 16px; text-align: center;\">회원가입을 위한 인증번호를 요청하셨습니다.</p>"
			        + "<p style=\"font-size: 16px; text-align: center;\">아래 인증 코드를 입력하여 이메일 인증을 완료해주세요:</p>"
			        + "<div style=\"background-color: #f0f0f0; border: 1px solid #ddd; padding: 20px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 4px;\">"
			        + "<strong style=\"color: #333;\">인증 코드: <span style=\"color: #4CAF50;\">" + code + "</span></strong>"
			        + "</div>"
			        + "<p style=\"font-size: 16px; text-align: center; margin-top: 20px;\">인증 코드가 보이지 않거나 문제가 발생하면, 고객센터에 문의해 주세요.</p>"
			        + "<p style=\"font-size: 16px; text-align: center; color: #777;\">감사합니다.</p>"
			        + "<p style=\"font-size: 14px; text-align: center; color: #999;\">이 메일은 자동 발송된 메일입니다. 회신 불가입니다.</p>"
			        + "</div>"
			        + "</body></html>";
			
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
			
			//이메일의 본문
			String emailContent = "<html><body style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6;\">"
			        + "<div style=\"width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;\">"
			        + "<h2 style=\"color: #4CAF50; text-align: center;\">이메일 인증</h2>"
			        + "<p style=\"font-size: 16px; text-align: center;\">안녕하세요,</p>"
			        + "<p style=\"font-size: 16px; text-align: center;\">임시 비밀번호가 생성되었습니다.</p>"
			        + "<p style=\"font-size: 16px; text-align: center;\">아래 임시비밀번호를 입력하여 로그인을 완료해주세요:</p>"
			        + "<div style=\"background-color: #f0f0f0; border: 1px solid #ddd; padding: 20px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 4px;\">"
			        + "<strong style=\"color: #333;\"> 임시 비밀번호: <span style=\"color: #4CAF50;\">" + code + "</span></strong>"
			        + "</div>"
			        + "<p style=\"font-size: 16px; text-align: center; margin-top: 20px;\">임시 비밀번호가 보이지 않거나 문제가 발생하면, 고객센터에 문의해 주세요.</p>"
			        + "<p style=\"font-size: 16px; text-align: center; color: #777;\">감사합니다.</p>"
			        + "<p style=\"font-size: 14px; text-align: center; color: #999;\">이 메일은 자동 발송된 메일입니다. 회신 불가입니다.</p>"
			        + "</div>"
			        + "</body></html>";
			
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
