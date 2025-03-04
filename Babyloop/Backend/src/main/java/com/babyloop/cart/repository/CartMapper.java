package com.babyloop.cart.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface CartMapper {

    // 장바구니 상품 목록 조회
    public List<CartDTO> getCartList(@Param("userId") String userId);

    // 상품의 재고 조회
    public int getStock(int productId);

    // 장바구니에 상품이 이미 존재하는지 확인
    public int checkCartItemExists(@Param("userId") String userId, @Param("productId") int productId);

    // 장바구니 상품 추가				
    public void addCartItem(@Param("userId") String userId,
                     @Param("productId") int productId,
                     @Param("quantity") int quantity,
                     @Param("rentalStart") LocalDate rentalStart);

    // 장바구니 상품 삭제
    public int deleteCartItem(@Param("userId") String userId, @Param("productId") int productId);

    // 장바구니 상품 수량 변경
    public void setCartItemQuantity(@Param("userId") String userId,
                             @Param("productId") int productId,
                             @Param("quantity") int quantity,
                             @Param("rentalStart") LocalDate rentalStart);
    // 장바구니 비우기
    public int clearCartByUser(@Param("userId") String userId);

    // 사용자별 포인트 비율 조회
    public float getPointRate(@Param("userId") String userId);

    // 장바구니 상품 조회 (userId 와 productId)
    public CartDTO deleteCartItemByProductId(@Param("userId") String userId, @Param("productId") int productId);
}
