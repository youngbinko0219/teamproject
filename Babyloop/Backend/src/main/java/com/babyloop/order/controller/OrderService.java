package com.babyloop.order.controller;


import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.babyloop.order.repository.OrderDTO;
import com.babyloop.order.repository.OrderMapper;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {

    private final OrderMapper orderMapper;
    
    public OrderService(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    // 바로 주문 미리보기 정보 조회
    public OrderDTO getNowOrderPreview(String userId, int productId, int quantity, int orderStock, LocalDate rentalDate) {
        // 주문 정보 조회
        OrderDTO orderDTO = orderMapper.getNowOrderPreview(userId, productId, quantity, orderStock, rentalDate);

        // 사용자의 등급 정보 조회
        float pointRate = orderMapper.getPointRate(userId);  // 등급에 따른 적립 비율 가져오기
        orderDTO.setPointRate(pointRate);

        // 사용자의 보유 포인트 조회
        int userPoints = orderMapper.getUserPoints(userId);  // 사용자가 보유한 포인트 조회
        orderDTO.setRewardPoints(userPoints);  // 보유 포인트를 RewardPoints에 설정

        orderDTO.setQuantity(quantity);
        orderDTO.setOrderStock(orderStock);
        orderDTO.setRentalDate(rentalDate);

        // 재고 확인
        int stock = orderMapper.getStock(productId);  // 재고 수량 확인
        if (stock < orderStock) {
            // 재고가 부족하면 예외를 던짐
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "재고 수량이 초과되었습니다.");
        }

        return orderDTO;
    }
}


