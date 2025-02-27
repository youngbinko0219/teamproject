package com.babyloop.payment.repository;

import java.time.LocalDate;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IRentalsMapper {
	
	/*결제 승인시 저장*/
	public int insertPayment(RentalsDTO rentalseDTO);
	
	/*결제 내용 저장*/
	public int insertPayinfo(RentalsDTO rentalseDTO);
	
	/*대여 내역 저장*/
	public int insertRentals(
			@Param("userId") String userId,
			@Param("total") int total,
			@Param("rentalEnd") LocalDate rentalEnd,
			@Param("start") String start);
	
	/*포인트 조회*/
	public int userPoint(@Param("userId") String userId);
}
