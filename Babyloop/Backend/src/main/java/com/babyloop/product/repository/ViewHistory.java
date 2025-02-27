package com.babyloop.product.repository;

import lombok.Data;

@Data
public class ViewHistory {

	private String user_id;
	private int product_id;
	private int view_id;
}
