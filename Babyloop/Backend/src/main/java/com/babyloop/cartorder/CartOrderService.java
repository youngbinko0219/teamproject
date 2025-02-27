package com.babyloop.cartorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartOrderService {

    @Autowired
    private CartOrderMapper cartOrderMapper;

    public CartOrderPreviewDTO getCartOrderPreview(String userId) {
        // 유저 정보 조회
        CartUserDTO user = cartOrderMapper.findUserInfoByUserId(userId);
        
        // 장바구니 항목 조회
        List<CartItemDTO> cartItems = cartOrderMapper.findCartItemsByUserId(userId);

        // 포인트 비율 먼저 가져오기
        float pointRate = cartOrderMapper.getPointRate(userId);  // 이곳에서 포인트 비율을 가져옵니다.
        
        // 예시로 장바구니에 담긴 총 금액과 포인트를 계산
        int totalProductPrice = 0;
        int totalRewardPoints = 0;

        // 재고 부족 체크 및 포인트 계산
        for (CartItemDTO item : cartItems) {
        	item.setOrderStock(1);
        	
            int stock = cartOrderMapper.getStock(item.getProductId());
            if (item.getOrderStock() > stock) {
                throw new RuntimeException("상품 " + item.getProductName() + "의 재고가 부족합니다.");
            }
            totalProductPrice += item.getPrice() * item.getQuantity();
            
            // 각 상품에 대해 포인트 비율을 곱해서 적립 포인트 계산
            int rewardPoints = (int) (item.getPrice() * item.getQuantity() * pointRate);
            item.setRewardPoints(rewardPoints);  // 계산된 rewardPoints 값을 각 item에 설정
            totalRewardPoints += rewardPoints;
        }

        // 총 적립 포인트 계산 (상품 총 가격 * 포인트 비율)
        totalRewardPoints = (int) (totalProductPrice * pointRate);

        int userPoints = cartOrderMapper.getUserPoints(userId);
        
        // CartOrderPreviewDTO 객체에 데이터 매핑
        CartOrderPreviewDTO preview = new CartOrderPreviewDTO();
        preview.setUserId(user.getUserId());
        preview.setUserName(user.getUserName());
        preview.setUserPhone(user.getUserPhone());
        preview.setUserAddr1(user.getUserAddr1());
        preview.setUserAddr2(user.getUserAddr2());
        preview.setUserAddr3(user.getUserAddr3());
        preview.setUserEmail(user.getUserEmail());
        preview.setUserPoints(userPoints);
        preview.setCartItems(cartItems);
        preview.setTotalRewardPoints(totalRewardPoints);  // 총 적립 포인트
        preview.setTotalProductPrice(totalProductPrice);  // 총 가격

        return preview;
    }


}
