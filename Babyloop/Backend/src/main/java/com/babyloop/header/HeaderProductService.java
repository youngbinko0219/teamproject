package com.babyloop.header;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class HeaderProductService {

    @Autowired
    private HeaderProductsMapper headerProductMapper;

    public List<HeaderProductsDTO> getAllProducts() {
        return headerProductMapper.selectAllProducts();
    }

    public List<HeaderProductsDTO> getBestProducts() {
        return headerProductMapper.selectBestProducts();
    }
    
    public List<HeaderTodayProductsDTO> getTodayProducts() {
        return headerProductMapper.selectTodayProducts();
    }

    public List<HeaderProductsDTO> getNewProducts() {
        return headerProductMapper.selectNewProducts();
    }
}
