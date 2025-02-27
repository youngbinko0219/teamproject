package com.babyloop.popularity;

import lombok.Data;

@Data
public class PopularityDTO {
	private int productId;
    private String productName;
    private int likeCount;
    private int rentalCount;
    private int viewCount;
    private float ratingAvg;
    private String mainImage;
}
