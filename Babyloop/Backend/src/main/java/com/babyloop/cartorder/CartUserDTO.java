package com.babyloop.cartorder;

import lombok.Data;

@Data
public class CartUserDTO {
    private String userId;
    private String userName;
    private String userPhone;
    private String userAddr1;
    private String userAddr2;
    private String userAddr3;
    private String userEmail;
    private int userPoints;
}
