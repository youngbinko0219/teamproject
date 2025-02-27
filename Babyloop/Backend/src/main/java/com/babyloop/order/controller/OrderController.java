package com.babyloop.order.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.babyloop.order.repository.OrderDTO;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/now-order-preview")
    public OrderDTO getNowOrderPreview(@RequestBody OrderDTO orderDTO) {
        try {
            // 주문 미리보기 정보 조회
            OrderDTO resultOrderDTO = orderService.getNowOrderPreview(
                orderDTO.getUserId(),
                orderDTO.getProductId(),
                orderDTO.getQuantity(),  // quantity 추가
                orderDTO.getOrderStock(),  // orderStock 추가
                orderDTO.getRentalDate()
            );

            // 상품 * 수량 가격 계산 (프론트에서 처리 가능)
            resultOrderDTO.setTotalProductPrice(resultOrderDTO.getPrice() * orderDTO.getQuantity());

            // 적립 예정 포인트 계산 (상품 가격 * 수량 * 적립 비율)
            int rewardPoints = (int) (resultOrderDTO.getPrice() * orderDTO.getQuantity() * resultOrderDTO.getPointRate());
            resultOrderDTO.setTotalRewardPoints(rewardPoints);

            return resultOrderDTO;
        } catch (ResponseStatusException e) {
            // 재고 부족 시 400 에러 응답 처리
            throw e;  // 예외를 다시 던져서 적절한 응답을 클라이언트에 전달
        }
    }
}

