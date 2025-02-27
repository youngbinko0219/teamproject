package com.babyloop.auth.repository;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.babyloop.product.repository.PayinfoDTO;

@Mapper
public interface IGradesMapper {

	/*회원 등급 조회*/
	HashMap<String, Object> gradeInfo(@Param("grades")GradesDTO gradesDTO);
	
	/*포인트 내역 조회*/
	ArrayList<PayinfoDTO> pointInfo(PayinfoDTO payinfoDTO);
	
	/*등급 업*/
	public int gradeUp(@Param("userId") String userId);
	
	/*리뷰 추가 포인트*/
	public boolean reviewPoint(@Param("addPoint") int addPoint,
						@Param("userId") String userId);
	
	/*포인트 내역 상태추가*/
	public boolean statusPoint(@Param("addPoint") int addPoint,
						@Param("userId") String userId);
	
	/*상품 구매 포인트 추가*/
	public int productPoint(@Param("pay") PayinfoDTO payinfoDTO,
								@Param("userId") String userid);
	
	/*포인트 차감*/
	public int productDePoint(@Param("pay") PayinfoDTO payinfoDTO,
								@Param("userId") String userid);
	
}
