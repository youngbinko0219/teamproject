package com.babyloop.product.repository;



import lombok.Data;

@Data
public class ImgDTO {

	private int image_id; //이미지 번호
	private int product_id; //사품 번호
	private int review_id;
	private String images; //이미지
	private String flag; // 이미지 분류
	private String created_at; //게시날짜
	private String updated_at; //수정날
	
}
