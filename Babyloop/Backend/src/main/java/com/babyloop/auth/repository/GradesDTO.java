package com.babyloop.auth.repository;

import lombok.Data;

@Data
public class GradesDTO {

	private String user_id; //회원 id
	private String grade_name; //회원 등급
	private double point_rate; // 회원 접립율
	private int required_points; //등급까지 남음 금액
	private int points; //회원테이블의 보유포인트
}
