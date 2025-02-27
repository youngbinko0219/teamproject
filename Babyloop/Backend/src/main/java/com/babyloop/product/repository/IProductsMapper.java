package com.babyloop.product.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IProductsMapper {

	/* 사용자 */
	
	/*관리자 상품 등록*/
	public int insertProduct(ProductsDTO productsDTO);

	/*상품 목록*/
	public ArrayList<Map<String,Object>> selectProduct(@Param("category") String category);

	/*상품 상세정보*/
	public HashMap<String, Object> productView(@Param("productId") String productId);
	
	
	/*상품 조회수 증가*/
	public int viewCount(@Param("productId") String productId);
	
	/*기록 갯수 조회*/
	public int countHistory(@Param("userId") String userId);
	
	/*기록 삭제*/
	public int oldHistory(@Param("userId") String userId);
	
	/*상품 기록*/
	public int recordProducts(@Param("userId") String userId,
							@Param("productId") String productId);
	
	/* 상품 검색 */
	public ArrayList<Map<String, Object>> searchProduct(@Param("searchName") String searchName);
	
	/*필터 검색*/
	   public HashMap<String, Object> filterSearch(
		         @Param("sPrice") int sPrice,
		         @Param("ePrice") int ePrice,
		         @Param("category") String category,
		         @Param("searchName") String searchName);
	
	
	/* 관리자 */
	
	/*관리자 상품 목록*/
	public ArrayList<?> adminProduct(@Param("limit") int limit,
									@Param("offset") int offset);
	/* 페이징 */
	public int countProduct();
	
	/* 추천상품 데이터 생성 */
	public int setupProductData(@Param("productId") int productId);

	/* 재고량 메시지*/
	public HashMap<String, Object> stockMessage();
	
	/*상품 재고량 알림 등록*/
	public int stockSet(@Param("productId") int productId);
	
}
