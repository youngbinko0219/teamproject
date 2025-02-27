package com.babyloop.auth.repository;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
	
	private String user_id; //회원 아이디
	private String user_pw; // 회원 비번
	private String user_name; //회원 이름
	private String user_email; //회원 이메일
	private String user_phone; //회원 전화번호
	private String user_addr1; //회원 우편번호
	private String user_addr2; //회원 주소
	private String user_addr3; //회원 상세주소
	private String user_gender; //회원 성별
	private String user_birth; //회원 생일
	private String created_at; //가입 일자
	private int points; //회원 보유 포인트
	private String provider; // 로그인 종류
	private String provider_id; // 소셜 고유키
	private int duration; // 정지 기간
	
}
