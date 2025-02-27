package com.babyloop.cartorder;

import lombok.Data;

@Data
public class CartItemDTO {
    private int productId;
    private String productName;
    private int price;
    private int quantity;
    private int orderStock;
    private String rentalStart;
    private int rewardPoints;
    private String productImage;
}
