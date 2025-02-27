package com.babyloop.order.repository;

import java.time.LocalDate;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {

    // 바로 주문 미리보기 정보 조회
    public OrderDTO getNowOrderPreview(@Param("userId") String userId, 
                                       @Param("productId") int productId, 
                                       @Param("quantity") int quantity,  // 대여 수량
                                       @Param("orderStock") int orderStock,  // 주문 수량
                                       @Param("rentalDate") LocalDate rentalDate);

    // 사용자의 적립 퍼센트 조회 (등급에 따른)
    public float getPointRate(@Param("userId") String userId);

    // 사용자의 보유 포인트 조회
    public int getUserPoints(@Param("userId") String userId);
    
    // 상품의 재고 조회
    public int getStock(@Param("productId") int productId);
}
