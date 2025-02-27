package com.babyloop.product.repository;

import java.time.LocalDate;
import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IPayinfoMapper {
	
	/*결제 포인트 내역*/
	int pointPayment(@Param("pay") PayinfoDTO payinfoDTO,
					@Param("userId") String userId);
	
	/*포인트 전체 조회*/
	int totalPoint(@Param("userId") String userId);
	
	/*포인트 내역 조회*/
	ArrayList<Object> pointList(@Param("userId") String userId);
	
	/*등급 이름*/
	String gradeName(@Param("userId") String userId);
	
	/*대여 내역 목록*/
	ArrayList<Object> userRentals(@Param("userId") String userId);
	
	/*대여 내역 업데이트*/
	int userRentalsUpdate(@Param("userId") String userId,
						@Param("date") LocalDate date);
}
