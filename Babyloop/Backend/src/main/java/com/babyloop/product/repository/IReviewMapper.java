package com.babyloop.product.repository;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IReviewMapper {

	/*리뷰 등록*/
	public int insertReview(@Param("review")ReviewDTO  reviewDTO);
	
	/*리뷰 작성 체크*/
	public String noReview(@Param("userId") String userId,
							@Param("productId") String productId);
	
	/*상품 구매 체크*/
	public int okPay(@Param("userId") String userId,
					@Param("productId") String productId);
	
	/*신규 리뷰 신고*/
	public int durationUser(@Param("userId") String userId);
	
	
	/*신고 업데이트*/
	public int updateDuration(@Param("userId") String userId);
	
	/*신고 중복 체크*/
	public String durationCheck(@Param("userId")String userId);
	
	/*리뷰 목록*/
	public ArrayList<Map<String,Object>> reviewList(@Param("productId") String productId);
	
	
	/*좋아요 증감*/
	public int likeUp(@Param("reviewId") String reviewId);
	
	
	/*review_id가져오기*/
	int beforId();
}
