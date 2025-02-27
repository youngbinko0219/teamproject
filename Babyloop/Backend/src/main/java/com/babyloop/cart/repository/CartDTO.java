package com.babyloop.cart.repository;

import java.time.LocalDate;
import lombok.Data;

@Data
public class CartDTO {
    private String userId; // 회원 id
    private int productId; // 상품 id
    private String productName; // 상품 이름
    private int price; // 가격
    private int quantity; // 개월
    private String imageName;
    private int totalRewardPoints;
    private int totalProductPrice;
    private int totalCartRewardPoints;
    private int totalCartPrice;
    private float pointRate;
    private LocalDate rentalStart;
    private boolean isInStock;
    
}
