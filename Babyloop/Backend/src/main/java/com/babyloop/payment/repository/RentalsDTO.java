package com.babyloop.payment.repository;


import lombok.Data;

@Data
public class RentalsDTO {

	private int rental_id; //대여 번호 rental_붙혀서 사용
	private String user_id; // 대여한 사용자
	private int total_price; 
	private String status;
	private String rental_end; //대여 종료일
	private String created_at; // 대여 날짜
	private String payment_key; // 토스 결제키
	private String approved_at; //토스 승인일
	
	
	/* payinfo 정보*/
	private int user_depotints;
	private int user_addpoints;
	private String pymen_method;
}
