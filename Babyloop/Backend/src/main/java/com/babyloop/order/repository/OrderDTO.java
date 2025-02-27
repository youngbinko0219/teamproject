package com.babyloop.order.repository;

import java.time.LocalDate;

import lombok.Data;

@Data
public class OrderDTO {
    private String userId;
    private int productId;
    private String productName;       // 상품 이름
    private int price;                // 상품 가격
    private int quantity;             // 대여 수량 (quantity)
    private int orderStock;           // 주문 수량 (orderStock)
    private LocalDate rentalDate;     // 대여 시작일
    private int rewardPoints;         // 적립 포인트
    private String productImage;      // 상품 이미지
    private String userName;          // 사용자 이름
    private String userPhone;         // 사용자 핸드폰
    private String userAddr1;         // 우편번호 (user_addr1)
    private String userAddr2;         // 주소 (user_addr2)
    private String userAddr3;         // 상세주소 (user_addr3)
    private String userEmail;         // 사용자 이메일
    private int totalRewardPoints;    // 적립 예정 포인트
    private int totalProductPrice;    // 상품 * 수량 가격 (상품 가격 * 수량)
    private float pointRate;          // 적립 퍼센트 (등급에 따른)
}
