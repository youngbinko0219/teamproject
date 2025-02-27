package com.babyloop.images.repository;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdBannerResponse {
	private List<String> banners;
}
