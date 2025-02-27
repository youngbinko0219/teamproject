package com.babyloop.cartorder;

import java.util.List;
import lombok.Data;

@Data
public class CartOrderPreviewDTO {
    private String userId;
    private String userName;
    private String userPhone;
    private String userAddr1;
    private String userAddr2;
    private String userAddr3;
    private String userEmail;
    private int userPoints;
    private List<CartItemDTO> cartItems;
    private int totalRewardPoints;
    private int totalProductPrice;
}
