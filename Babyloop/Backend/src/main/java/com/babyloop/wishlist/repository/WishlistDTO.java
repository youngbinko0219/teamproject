package com.babyloop.wishlist.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishlistDTO {
    private int wishId; // 위시리스트 ID 추가
    private String userId;
    private int productId;
    private String productName;
}
