package com.babyloop.header;

import java.util.Date;

import lombok.Data;

@Data
public class HeaderTodayProductsDTO {
    private int productId;
    private String productName; // 상품이름
    private String category;
    private int stock; // 재고량
    private int price; // 가격
    private double popularityScore; // 가변 평점
    private Date createdAt;
    
    // 메인 이미지 필드 추가
    private String mainImage; // 메인 이미지 URL 또는 경로
}
