package com.babyloop.header;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/products")
public class HeaderProductsController {

    @Autowired
    private HeaderProductService headerProductService;

    
    @GetMapping("/all")
    public HeaderResponseDTO<List<HeaderProductsDTO>> getAllProducts() {
        // 모든 상품 가져오기
        List<HeaderProductsDTO> allProducts = headerProductService.getAllProducts();
        return new HeaderResponseDTO<>("success", allProducts);
    }
    
    @GetMapping("/best")
    public HeaderResponseDTO<List<HeaderProductsDTO>> getBestProducts() {
        // 모든 상품 가져오기
        List<HeaderProductsDTO> bestProducts = headerProductService.getBestProducts();
        return new HeaderResponseDTO<>("success", bestProducts);
    }
    

    @GetMapping("/today")
    public HeaderResponseDTO<List<HeaderTodayProductsDTO>> getRecommendedProducts() {
        // RestTemplate을 메소드 내부에서 생성
        RestTemplate restTemplate = new RestTemplate();
        
        // 외부 API에서 추천 상품 데이터 가져오기
        String recommendApiUrl = "http://localhost:8000/recommend?top_n=8";
        
        // RestTemplate으로 데이터 받아오기 (List<Map<String, Object>> 형태로 받음)
        List<Map<String, Object>> response = restTemplate.getForObject(recommendApiUrl, List.class);
        
        // Map에서 popularity_score만 추출하여 HeaderTodayProductDTO로 변환
        List<HeaderTodayProductsDTO> recommendedProducts = response.stream()
                .map(product -> {
                    HeaderTodayProductsDTO dto = new HeaderTodayProductsDTO();              
                    dto.setProductName((String) product.get("product_name")); // 외부 API에서 상품 이름 가져오기
                    dto.setPopularityScore((Double) product.get("popularity_score"));
                    return dto;
                })
                .collect(Collectors.toList());

        // 데이터베이스에서 상품 정보 가져오기
        List<HeaderTodayProductsDTO> dbProducts = headerProductService.getTodayProducts();
        
        // 외부 API와 데이터베이스 결과 병합 (productName을 기준으로)
        for (HeaderTodayProductsDTO apiProduct : recommendedProducts) {
            for (HeaderTodayProductsDTO dbProduct : dbProducts) {
                if (apiProduct.getProductName().equals(dbProduct.getProductName())) {
                    apiProduct.setProductId(dbProduct.getProductId());
                    apiProduct.setCategory(dbProduct.getCategory());
                    apiProduct.setStock(dbProduct.getStock());                
                    apiProduct.setPrice(dbProduct.getPrice());                   
                    apiProduct.setCreatedAt(dbProduct.getCreatedAt());
                    apiProduct.setMainImage(dbProduct.getMainImage());
                    break;
                }
            }
        }
        // 병합된 데이터를 HeaderResponseDTO로 반환
        return new HeaderResponseDTO<>("success", recommendedProducts);
    }


    @GetMapping("/new")
    public HeaderResponseDTO<List<HeaderProductsDTO>> getNewProducts() {
        // 새로운 상품 가져오기
        List<HeaderProductsDTO> newProducts = headerProductService.getNewProducts();
        return new HeaderResponseDTO<>("success", newProducts);
    }
}
