package com.babyloop.auth.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface IMemberMapper {

	/* 회원 */
	
	/*로그인*/
	public String login(MemberDTO memberDTO);
	
    // 소셜 로그인 및 회원가입
	public void loginSNSMember(MemberDTO memberDTO);
	
	// 소셜 id 조회
    public Optional<MemberDTO> findByProviderId(@Param ("providerId") String providerId);
	
	/*회원가입*/
	public int signupMember(@Param("member") MemberDTO memberDTO,
						@Param("encryptedPassword") String encryptedPaString);
	public int signupGrade(MemberDTO memberDTO);
	
	
	/*아이디 중복체크*/
	public String idcheck(MemberDTO emberDTO);

	/*아이디 찾기*/
	public String idSearch(MemberDTO memberDTO);
	
	/*비밀번호 찾기*/
	public String pwSearch(MemberDTO memberDTO);
	
	/*인증받은 이메일 체크*/
	public String emailCheck(MemberDTO memberDTO);
	
	/*임시비밀번호 저장*/
	public int changePw(@Param("member") MemberDTO memberDTO,
			@Param("encryptedPassword") String encryptedPaString);
	
	/*회원정보*/
	public HashMap<String, Object> memberInfo(String userId);
	
	/* 비밀번호 변경전 비번찾기*/
	public String pwEditSearch(@Param("userId") String userId);
	
	/*비밀번호 변경*/
	public int pwEdit(@Param("userId") String userId,
			@Param("newPw") String newPw);
	
	/*회원정보 수정*/
	public int infoEdit(@Param("userId") String userId,
			@Param("member") MemberDTO memberDTO);
	
	/*회원탈퇴*/
	public int userDelete(@Param("user_id") String userId);
	
	
	
	/* 관리자 */

	/*회원*/
	public ArrayList<?> adminMember(@Param("limit") int limit,
										@Param("offset") int offset);
	/*회원 총인원(페이징)*/
	public int countMember();
	
	
	/*관리자 회원 정지*/
	public int userBan(MemberDTO memberDTO);
	
	/*회원 정지 날짜 확인*/
	public String durationDate(MemberDTO memberDTO);
	
	
	/*정지 리스트*/
	public HashMap<String, Object> messageList();
}
