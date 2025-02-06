package com.babyloop.auth.member;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMemberService {

	public String login(MemberDTO memberDTO);
	public int register(@Param("member") MemberDTO memberDTO,
						@Param("encryptedPassword") String encryptedPaString);
}
