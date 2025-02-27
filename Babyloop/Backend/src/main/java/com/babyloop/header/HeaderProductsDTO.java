package com.babyloop.header;

import lombok.Data;
import java.util.Date; // 또는 java.time.LocalDate

@Data
public class HeaderProductsDTO {
    private int productId;
    private String productName; // 상품이름
    private String category;
    private int stock; // 재고량
    private int price; // 가격
    private int likeCount;
    private Date createdAt;
    
    // 메인 이미지 필드 추가
    private String mainImage; // 메인 이미지 URL 또는 경로
}
