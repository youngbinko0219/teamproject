package com.babyloop.product.repository;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PayinfoDTO {
	
	private int payment_id; // 상품개별 번호
	private String user_id; //회원 아이디
	private int user_depoints; // 차감 포인트
	private int user_addpoints; // 추가 포인트
	private String payment_method; //결제방법
	private String created_at;
}
