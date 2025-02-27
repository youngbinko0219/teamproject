package com.babyloop.product.repository;

import lombok.Data;

@Data
public class ProductsDTO {
	
	private int product_id; //상품번호
	private String category; //상품카테고리
	private String product_name; //상품이름
	private String description; //상품설명
	private int stock; //재고량
	private int price; //가격
	private String options;
	private String created_at;
	private String updated_at;
	
	/*영수증에 필요한 내용*/
	private int user_addpoints;
	private int quantity;
}
