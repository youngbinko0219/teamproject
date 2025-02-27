package com.babyloop.payment.repository;

import lombok.Data;

@Data
public class ConfirmDTO {
	
	private String paymentKey;
	private String orderId;
	private int amount;
	
	/*포인트 내역 저장*/
	private int user_depoints;
	private int user_addpoints;
	private String pointCreated_at;
	private String payment_method;
	
}
