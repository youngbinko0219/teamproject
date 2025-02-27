package com.babyloop.cart.controller;

import com.babyloop.cart.repository.CartDTO;
import com.babyloop.cart.repository.CartMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class CartService {

    private final CartMapper cartMapper;

    public CartService(CartMapper cartMapper) {
        this.cartMapper = cartMapper;
    }

    public List<CartDTO> getCartList(String userId) {
        List<CartDTO> cartList = cartMapper.getCartList(userId);

        int totalCartPrice = 0; // 장바구니 총 가격
        int totalCartRewardPoints = 0; // 총 적립 포인트

        for (CartDTO cartDTO : cartList) {
            // 상품의 재고를 체크하고 품절 여부를 갱신
        	int productId = cartDTO.getProductId();

            int stock = cartMapper.getStock(productId);
            if (stock == 0) {
                cartDTO.setInStock(false); // 재고가 없으면 재고 없음으로 설정
            } else {
                cartDTO.setInStock(true); // 재고가 있으면 재고 있음
            }

            float pointRate = cartMapper.getPointRate(userId);
            cartDTO.setPointRate(pointRate);

            // 개별 적립 포인트 계산
            int rewardPoint = (int) (cartDTO.getPrice() * cartDTO.getQuantity() * cartDTO.getPointRate());
            cartDTO.setTotalRewardPoints(rewardPoint);
            totalCartRewardPoints += rewardPoint; // 총 적립 포인트에 누적

            // 상품 가격 * 수량 계산
            int totalProductPrice = cartDTO.getPrice() * cartDTO.getQuantity();
            cartDTO.setTotalProductPrice(totalProductPrice);
            totalCartPrice += totalProductPrice; // 총 가격에 누적
        }

        // 전체 장바구니 금액과 총 적립 포인트를 추가하여 반환
        CartDTO totalCartDTO = new CartDTO();
        totalCartDTO.setTotalCartPrice(totalCartPrice);
        totalCartDTO.setTotalCartRewardPoints(totalCartRewardPoints);

        // 장바구니 리스트 뒤에 총 합계 정보를 추가할 수 있음
        cartList.add(totalCartDTO);

        return cartList;
    }


    // 장바구니에 상품 추가
    public void addCartItem(String userId, int productId, int quantity, LocalDate rentalStart) {
        int stock = cartMapper.getStock(productId);
        if (stock == 0) {
            throw new RuntimeException("해당 상품은 품절되었습니다.");
        }

        int exists = cartMapper.checkCartItemExists(userId, productId);
        if (exists > 0) {
            throw new RuntimeException("장바구니에 이미 해당 상품이 존재합니다.");
        }
        cartMapper.addCartItem(userId, productId, quantity, rentalStart);
    }

    // 장바구니 상품 삭제
    public void deleteCartItem(String userId, int productId) {
        // 장바구니에 해당 상품이 존재하는지 확인
        cartMapper.deleteCartItemByProductId(userId, productId);
        
        // 품절 여부 상관없이 장바구니에서 해당 상품 삭제
        int rowsDeleted = cartMapper.deleteCartItem(userId, productId);
        if (rowsDeleted == 0) {
            throw new RuntimeException("장바구니에서 상품 삭제 실패.");
        }
    }

    // 장바구니 상품 수량 지정
    public void setCartItemQuantity(String userId, int productId, int quantity, LocalDate rentalStart) {
        // 상품 존재 여부 확인
        int exists = cartMapper.checkCartItemExists(userId, productId);
        if (exists == 0) {
            throw new RuntimeException("장바구니에 해당 상품이 없습니다.");
        }

        if (quantity <= 0) {
            throw new RuntimeException("수량은 1 이상이어야 합니다.");
        }

        cartMapper.setCartItemQuantity(userId, productId, quantity, rentalStart);
    }

    public void clearCartByUser(String userId) {
        // 장바구니 비우기 작업 실행
        int rowsDeleted = cartMapper.clearCartByUser(userId);

        // 삭제된 행 수가 0이면 장바구니가 비어있는 상태
        if (rowsDeleted == 0) {
            throw new RuntimeException("해당 사용자의 장바구니에 비울 항목이 없습니다.");
        }
    }
}

