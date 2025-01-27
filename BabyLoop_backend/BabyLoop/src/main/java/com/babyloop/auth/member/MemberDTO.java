package com.babyloop.auth.member;

import lombok.Data;

@Data
public class MemberDTO {
	
	private String user_idx;
	private String user_id;
	private String user_pw;
	private String user_name;
	private String user_email;
	private String user_phone;
	private String user_addr1;
	private String user_addr2;
	private String user_addr3;
	private String user_gender;
	private String user_birth;
	private String created_at;
	private int points;
	private String login_type;
	
}
