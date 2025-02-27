package com.babyloop.wishlist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.babyloop.wishlist.repository.WishlistDTO;
import com.babyloop.wishlist.repository.WishlistMapper;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistMapper wishlistMapper;

    // 유저 조회
    public List<WishlistDTO> getWishlistByUserId(String userId) {
        return wishlistMapper.getWishlistByUserId(userId);
    }
    
    // 위시리스트에 상품 추가 후 데이터 반환
    public List<WishlistDTO> addToWishlist(WishlistDTO wishlistDTO) {
        // (userId, productId) 조합이 이미 존재하는지 확인
        WishlistDTO existingItem = wishlistMapper.getWishlistItemByUserAndProduct(
            wishlistDTO.getUserId(), wishlistDTO.getProductId()
        );

        if (existingItem != null) {
            // 이미 존재하면 추가하지 않고 기존 데이터 반환
            return List.of(existingItem);
        }

        // 데이터 삽입
        wishlistMapper.addToWishlist(wishlistDTO);

        // 추가된 데이터 조회하여 반환
        return wishlistMapper.getWishlistItems(wishlistDTO.getUserId(), wishlistDTO.getProductId());
    }

    // 위시리스트에서 상품 삭제 후 데이터 반환
    public WishlistDTO removeFromWishlist(String userId, int productId) {
        // 특정 (userId, productId) 기준으로 삭제할 항목 찾기
        WishlistDTO removedItem = wishlistMapper.getWishlistItemByUserAndProduct(userId, productId);

        if (removedItem != null) {
            wishlistMapper.removeFromWishlist(userId, productId);
            return removedItem;
        }

        return null; // 데이터가 없으면 삭제 안 함
    }
}


