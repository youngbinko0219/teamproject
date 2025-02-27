package com.babyloop.product.repository;

import lombok.Data;

@Data
public class RecommendationDTO {
	
	private int product_id;
	private int like_count;
	private int rental_count;
	private int view_count;
	private int rating_avg;
}
