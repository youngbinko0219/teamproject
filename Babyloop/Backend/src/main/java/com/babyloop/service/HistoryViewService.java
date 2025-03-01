package com.babyloop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.babyloop.product.repository.IProductsMapper;

@Service
public class HistoryViewService {
	
	@Autowired
	IProductsMapper productsDAO;
	
	
	@Transactional
	public void userViewHistory(String userId,
								String productId) {
		
		/*기록 갯수 조회*/
		int count = productsDAO.countHistory(userId);
		
		if(count>5) {
			/*기록 삭제*/
			productsDAO.oldHistory(userId);
		}
		/*상품 기록*/
		productsDAO.recordProducts(userId, productId);
		
		/*조회수 증가*/
		productsDAO.viewCount(productId);
	}
	
}
