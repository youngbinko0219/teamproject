package com.babyloop.cartorder;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CartOrderMapper {

    // 장바구니 항목 조회
    public List<CartItemDTO> findCartItemsByUserId(@Param("userId") String userId);

    // 유저 정보 조회
    public CartUserDTO findUserInfoByUserId(@Param("userId") String userId);
    
    // 사용자의 적립 퍼센트 조회 (등급에 따른)
    public float getPointRate(@Param("userId") String userId);

    // 사용자의 보유 포인트 조회
    public int getUserPoints(@Param("userId") String userId);
    
    // 상품의 재고 조회
    public int getStock(@Param("productId") int productId);
}
