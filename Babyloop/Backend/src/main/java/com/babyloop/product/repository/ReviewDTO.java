package com.babyloop.product.repository;

import lombok.Data;

@Data
public class ReviewDTO {

	private int review_id; // 리뷰 번호
	private int product_id; // 상품 번호
	private String user_id; // 회원 아이디
	private float rating; // 리뷰 평점
	private String review_text; // 리뷰 내용
	private String created_at; // 작성일
}
