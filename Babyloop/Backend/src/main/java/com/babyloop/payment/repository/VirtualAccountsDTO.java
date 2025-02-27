package com.babyloop.payment.repository;

import lombok.Data;

@Data
public class VirtualAccountsDTO {

	private int amount; // 결제 금액
	private String orderId; // 주문번호
	private String oderName; // 주문 내용
	private String customerName; // 입금자 이름
	private String bank; //은행
	private int validHours = 24; //입금시간 24시간
}
