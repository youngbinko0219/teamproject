package com.babyloop.wishlist.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.wishlist.repository.ApiResponse;
import com.babyloop.wishlist.repository.WishlistDTO;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // 위시리스트에 상품 추가
    @PostMapping
    public ResponseEntity<ApiResponse> addToWishlist(@RequestBody WishlistDTO wishlistDTO) {
        List<WishlistDTO> addedItems = wishlistService.addToWishlist(wishlistDTO);

        if (addedItems.isEmpty()) {
            // 이미 존재하는 경우 추가하지 않고 응답 반환
            return ResponseEntity.status(400).body(new ApiResponse("failure", "이미 위시리스트에 있는 상품입니다."));
        }

        return ResponseEntity.ok(new ApiResponse("success", addedItems));
    }

    // 특정 유저의 위시리스트 목록 조회
    @GetMapping("/{user_id}")
    public ResponseEntity<ApiResponse> getWishlistByUserId(@PathVariable("user_id") String userId) {
        List<WishlistDTO> wishlist = wishlistService.getWishlistByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("success", wishlist));
    }

    // 위시리스트에서 상품 삭제
    @DeleteMapping("/{user_id}/{product_id}")
    public ResponseEntity<ApiResponse> removeFromWishlist(@PathVariable("user_id") String userId, @PathVariable("product_id") int productId) {
        WishlistDTO removedItem = wishlistService.removeFromWishlist(userId, productId);

        if (removedItem != null) {
            return ResponseEntity.ok(new ApiResponse("success", Map.of(
                "removed", true,
                "wish_id", removedItem.getWishId(),
                "user_id", removedItem.getUserId(),
                "product_id", removedItem.getProductId(),
                "product_name", removedItem.getProductName()
            )));
        }

        // 삭제할 데이터가 없을 경우
        return ResponseEntity.status(400).body(new ApiResponse("failure", "삭제할 상품이 위시리스트에 없습니다."));
    }
}
