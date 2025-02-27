package com.babyloop.cartorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart-order")
public class CartOrderController {

    @Autowired
    private CartOrderService cartOrderService;

    // 
    @PostMapping("/preview")
    public ResponseEntity<CartOrderPreviewDTO> getCartOrderPreview(@RequestBody CartUserDTO cartUserDTO) {
        
        CartOrderPreviewDTO preview = cartOrderService.getCartOrderPreview(cartUserDTO.getUserId());
        return ResponseEntity.ok(preview);
    }
}
