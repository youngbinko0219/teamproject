package com.babyloop.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.babyloop.service.ProductImageService;
import com.babyloop.product.repository.IProductsMapper;
import com.babyloop.product.repository.ProductsDTO;

@RestController
@RequestMapping("/admin")
public class AdminProductCtrl {

    @Autowired
    private IProductsMapper productsDAO;
    
    
    @Autowired
    private ProductImageService productImage;
    
    @Autowired
    private TransactionTemplate transaction;

    
    /**
     * 관리자 상품 등록
     * @RequestPart "main_img": 메인 이미지 파일 배열
     * @RequestPart "sub_img": 서브 이미지 파일 배열
     * @RequestPart "desc_img": 상세 이미지 파일 배열
     * @RequestPart "product": 상품 정보 (ProductsDTO)
     */
    @PostMapping("/products")
    public Map<String, String> productsAdd(
            @RequestPart(value = "main_img", required = false) MultipartFile[] main,
            @RequestPart(value = "sub_img", required = false) MultipartFile[] sub,
            @RequestPart(value = "desc_img", required = false) MultipartFile[] desc,
            @RequestPart("product") ProductsDTO productsDTO) {

        Map<String, String> map = new HashMap<>();

        try {
        	transaction.execute(new TransactionCallbackWithoutResult() {
				
				@Override
				protected void doInTransactionWithoutResult(TransactionStatus status) {

					/*제품 정보 DB 등록*/
					productsDAO.insertProduct(productsDTO);
					int productId = productsDTO.getProduct_id();
					
					if(main != null && sub != null && desc != null) {
						/*각 이미지 그룹 처리*/
						productImage.processImageFiles(main, productId, "main"); 
						productImage.processImageFiles(sub, productId, "sub");
						productImage.processImageFiles(desc, productId, "desc");				
					}
					
					/*추천상품 생성*/
					productsDAO.setupProductData(productId);
					
					/*상품의 재고량 알림설정*/
					productsDAO.stockSet(productId);
				}
			});

            map.put("message", "success");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        return map;
    }
    
    
    /**
     * 관리자 상품목록
     * selectProduct(ProductDTO) : 상품목록 조회
     * @RequestParam "page" : 페이징 페이지
     * @RequestParam "size" : 페이지 사이즈
    */
    @GetMapping("/products")
    public Map<?,?> allProducts(
    		@RequestParam(name="page", defaultValue="1") int page,
    		@RequestParam(name="size", defaultValue="10") int size){
    	
    	int offset = (page - 1) * size;
    	
    	List<?> products = productsDAO.adminProduct(size, offset);
    	
    	int totalCount = productsDAO.countProduct();
    	
    	Map<String, Object> map = new HashMap<>();
    	
    	map.put("products", products);
    	map.put("totalCount", totalCount);
    	map.put("page", page);
    	map.put("totalPages", (int) Math.ceil((double) totalCount / size));
    	
    	return map; 
    }
    
}
