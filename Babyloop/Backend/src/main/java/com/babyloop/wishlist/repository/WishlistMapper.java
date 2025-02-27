package com.babyloop.wishlist.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface WishlistMapper {

    // 위시리스트에 상품 추가
    int addToWishlist(WishlistDTO wishlistDTO);

    // 특정 유저의 위시리스트 조회
    List<WishlistDTO> getWishlistByUserId(@Param("userId") String userId);

    // 특정 상품이 위시리스트에 있는지 확인 (userId, productId 기준)
    WishlistDTO getWishlistItemByUserAndProduct(@Param("userId") String userId, @Param("productId") int productId);

    // 추가된 위시리스트 아이템 조회
    List<WishlistDTO> getWishlistItems(@Param("userId") String userId, @Param("productId") int productId);

    // 위시리스트에서 특정 (userId, productId)를 기준으로 삭제
    int removeFromWishlist(@Param("userId") String userId, @Param("productId") int productId);
}
