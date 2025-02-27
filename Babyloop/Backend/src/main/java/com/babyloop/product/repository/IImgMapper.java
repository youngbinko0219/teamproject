package com.babyloop.product.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IImgMapper {
	
	/*이미지 등록*/
	public int insertImgs(@Param("img")ImgDTO imgDTO,
			@Param("reviewId") int reviewId);
	
	public int product(ImgDTO imgDTO);
	
	
	/*sub 이미지 반환*/
	public ArrayList<String> productImgs(@Param("productId")String productId);
	
	/*review 이미지 반환*/
	public ArrayList<String> reviewImg(@Param("reviewId") int reviewId);
	
	
	/*광광고 등록 */
	public int insertAdImgs(ImgDTO imgDTO);
	
	/*이미지 삭제*/
    public boolean deleteImageByUrl(String url);

    /*광고 이미지 조회*/
    public List<String> getAdBanners();
    
    
    /**/
    public Map<String, Object> descImg(@Param("productId") String productId);
    
    
    public Map<String, Object> mainImg(@Param("productId") String productId);
	
}
