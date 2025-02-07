package com.babyloop.auth.member;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMemberService {

	//로그인
	public String login(MemberDTO memberDTO);
	
	//회원가입
	public int register(@Param("member") MemberDTO memberDTO,
						@Param("encryptedPassword") String encryptedPaString);
	
	//아이디 중복체크
	public String idcheck(MemberDTO emberDTO);

	//아이디 찾기
	public String idSearch(MemberDTO memberDTO);
	
	//비밀번호 찾기
	public String pwSearch(MemberDTO memberDTO);
	
	//인증받은 이메일 체크
	public String emailCheck(MemberDTO memberDTO);
	
	//임시비밀번호 저장
	public int changePw(@Param("member") MemberDTO memberDTO,
			@Param("encryptedPassword") String encryptedPaString);
	
	//회원정보
	public ArrayList<MemberDTO> memberInfo(String userId);
}
