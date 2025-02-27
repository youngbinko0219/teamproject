package com.babyloop.header;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HeaderProductsMapper {

	List<HeaderProductsDTO> selectAllProducts();
	List<HeaderTodayProductsDTO> selectTodayProducts();
    List<HeaderProductsDTO> selectBestProducts();
    List<HeaderProductsDTO> selectNewProducts();
}
