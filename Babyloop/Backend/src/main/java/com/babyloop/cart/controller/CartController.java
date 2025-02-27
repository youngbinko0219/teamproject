package com.babyloop.cart.controller;

import com.babyloop.cart.repository.CartDTO;

import java.util.List;

import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final TransactionTemplate transactionTemplate;

    public CartController(CartService cartService, TransactionTemplate transactionTemplate) {
        this.cartService = cartService;
        this.transactionTemplate = transactionTemplate;
    }

    @GetMapping("/list")
    public List<CartDTO> getCartList(@RequestParam("userId") String userId) {
        return cartService.getCartList(userId);
    }

    @PostMapping("/add")
    public List<CartDTO> addCartItem(@RequestBody CartDTO cartDTO) {
        return transactionTemplate.execute(status -> {
            try {
                cartService.addCartItem(cartDTO.getUserId(), 
                                         cartDTO.getProductId(), 
                                         cartDTO.getQuantity(),
                                         cartDTO.getRentalStart());
                return cartService.getCartList(cartDTO.getUserId());
            } catch (RuntimeException e) {
                status.setRollbackOnly();
                throw e;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw new RuntimeException("장바구니 추가 중 오류가 발생했습니다.");
            }
        });
    }

    @PutMapping("/set")
    public List<CartDTO> setCartItemQuantity(@RequestBody CartDTO cartDTO) {
        return transactionTemplate.execute(status -> {
            try {
                cartService.setCartItemQuantity(cartDTO.getUserId(), cartDTO.getProductId(), cartDTO.getQuantity(), cartDTO.getRentalStart());
                return cartService.getCartList(cartDTO.getUserId());
            } catch (RuntimeException e) {
                status.setRollbackOnly();
                throw e;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw new RuntimeException("장바구니 상품 수량 변경 중 오류가 발생했습니다.");
            }
        });
    }

    @DeleteMapping("/delete")
    public List<CartDTO> deleteCartItem(@RequestBody CartDTO cartDTO) {
        return transactionTemplate.execute(status -> {
            try {
                cartService.deleteCartItem(cartDTO.getUserId(), cartDTO.getProductId());
                return cartService.getCartList(cartDTO.getUserId());
            } catch (RuntimeException e) {
                status.setRollbackOnly();
                throw e;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw new RuntimeException("장바구니 상품 삭제 중 오류가 발생했습니다.");
            }
        });
    }

    @DeleteMapping("/clear")
    public List<CartDTO> clearCartByUser(@RequestBody CartDTO cartDTO) {
        return transactionTemplate.execute(status -> {
            try {
                cartService.clearCartByUser(cartDTO.getUserId());
                return cartService.getCartList(cartDTO.getUserId());
            } catch (RuntimeException e) {
                status.setRollbackOnly();
                throw e;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw new RuntimeException("장바구니 비우기 중 오류가 발생했습니다.");
            }
        });
    }
}

