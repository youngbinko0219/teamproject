package com.babyloop.product.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.babyloop.auth.repository.IGradesMapper;
import com.babyloop.product.repository.IImgMapper;
import com.babyloop.product.repository.IProductsMapper;
import com.babyloop.product.repository.IReviewMapper;
import com.babyloop.product.repository.ImgDTO;
import com.babyloop.product.repository.LikesDTO;
import com.babyloop.product.repository.ReviewDTO;
import com.babyloop.service.HistoryViewService;
import com.babyloop.service.MemberGradeUp;
import com.babyloop.service.ProductImageService;


@RestController
@RequestMapping("/products")
public class ProductCtrl {

	/*Mapper*/
	
	@Autowired
	IProductsMapper productsDAO;
	@Autowired
	IImgMapper imgDAO;
	@Autowired
	IReviewMapper reviewDAO;
	@Autowired
	IGradesMapper gradesDAO;
	
	/*Service*/
	
	@Autowired
	MemberGradeUp memberGradeUp;
	@Autowired
	HistoryViewService viewService;
	
	
	@Autowired
    private ProductImageService productImage;
	
	@Autowired
	TransactionTemplate transaction;
	
	/**
	 * 상품 목록
	 * @PathVariable category : 상품의 카테고리
	*/
	@GetMapping("/{category}")
	public List<Map<String,Object>> getProductList(
			@PathVariable(value = "category",
					required = false) String category){
		
		/*null 값 처리*/
		if(category == null || category.trim().isEmpty()) {
			category = "all";
		}
		
		try {
			
	         ArrayList<Map<String,Object>>
	         	products = productsDAO.selectProduct(category);
	         
	         return products;
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("에러임!",e);
		}
	}
	
	
	/**
	 * 상품 상세정보
	 * @param productId : 특정상품의 아이디
	 * @RequestParam userId : 상세정보 클릭한 회원
	 * @return 상품의 상세 정보
	 */
	@GetMapping("/view/{product_id}")
	public Map<String, Object> productView(
			@PathVariable("product_id") String productId,
			@RequestParam(value = "user_id", required = false,
					defaultValue = "guest") String userId) {
	    
		try {
	    	/*상품 상세정보*/
	        HashMap<String, Object> product = productsDAO.productView(productId);
	        
	        ImgDTO imgDTO = new ImgDTO();
	        imgDTO.setFlag("sub");
	        
	        /*상품 서브이미지*/
	        ArrayList<String> images = imgDAO.productImgs(productId);
	        
	        product.put("images", images);
	        
	        if(!userId.equals("guest")) {
	        	/*최근 본 상품*/
	        	viewService.userViewHistory(userId, productId);
	        }
	        
	        /*조회수 증가*/
			productsDAO.viewCount(productId);
	        
	        return product;
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new HashMap<>();
	    }
	}
	
	
	/**
	 * 상품 리뷰등록
	 * @PathVariable product_id : 상품의 고유번호
	 * @RequestPart reviews : 리뷰의 내용을 담음
	 * @RequestPart review_img : 리뷰의 이미지를 담음
	 * 
	 * 추가 - 사진 등록시 포인트 정립 500pt (기본 300pt)
	 */
	@PostMapping("/{product_id}/reviews")
	public Map<String , Object>  createReview(
			@PathVariable("product_id") String productId,
			@RequestPart("reviews") ReviewDTO reviewDTO,
			@RequestPart(value = "review_img", required = false) MultipartFile[] reviewImg) {
		
		Map<String, Object> map = new HashMap<>();
		
		try {
			/*상품 구매 체크*/
			if(reviewDAO.okPay(reviewDTO.getUser_id(),
					productId) >0) {
				
				/*리뷰 작성 체크*/
				if(reviewDAO.noReview(reviewDTO.getUser_id(),
						productId) == null) {
					
					/**
					 * 트랜잭션 처리
					 */
					transaction.execute(new TransactionCallbackWithoutResult() {
						
						@Override
						protected void doInTransactionWithoutResult(TransactionStatus status) {
							
							
							/*리뷰 등록*/
							reviewDAO.insertReview(reviewDTO);
							
							/*이전 review_id*/
							int reviewId = reviewDAO.beforId();
							
							
							if(reviewImg != null) {
								
								productImage.processImageFilesReview(reviewImg, reviewId,
																	Integer.parseInt(productId),"review"); 
								
								/* 사진첨부 500pt추가*/
								gradesDAO.reviewPoint(500, reviewDTO.getUser_id()); //회원포인트 추가
								gradesDAO.statusPoint(500, reviewDTO.getUser_id()); //포인트 내역 추가
								
								
							}else {
								/*리뷰만 작성시 300pt*/
								gradesDAO.reviewPoint(300, reviewDTO.getUser_id()); //회원포인트 추가
								gradesDAO.statusPoint(300, reviewDTO.getUser_id()); //포이트 내역 추가
							}
							
							/*등급업*/
							memberGradeUp.upgrade(reviewDTO.getUser_id());
						}
					});
					
				}else {
					map.put("message", "noWrite");
					return map;
				}
				
			}else {
				map.put("message", "noPay");
				return map;
			}
			
			map.put("message", "success");
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return map;
	}
	
	
	/* 상품 검색 */
	@GetMapping("/search")
	public List<Map<String, Object>> searchProduct(
			@RequestParam("searchName") String searchName){
		
		List<Map<String, Object>> list = productsDAO.searchProduct(searchName);
		
		return list;
	}
	
	
	   /*필터 검색*/
	   @GetMapping("/filter/search")
	   public List<Map<String, Object>> filterSearch(
	         @RequestParam("sPrice") int sPrice,
	         @RequestParam("ePrice") int ePrice,
	         @RequestParam("category") String category,
	         @RequestParam("searchName") String searchName){
	      
	      String[] str = category.split(",");
	      
	      List<Map<String, Object>> list = new ArrayList<>();
	      for(int i=0;i<str.length;i++) {
	         HashMap<String, Object> clist = productsDAO
	               .filterSearch(sPrice, ePrice, str[i], searchName);
	         
	         list.add(clist);
	      };
	      
	      System.out.println(list);
	      
	      return list;
	   }
	   
	   
	   
	   @GetMapping("/{product_id}/desc")
	   public Map<String,Object> descImg(
			   @PathVariable("product_id") String productId){
		   
		   Map<String, Object> image = imgDAO.descImg(productId);
		   
		   return image;
	   }
	   
	   
	   
	   @GetMapping("/{product_id}/main")
	   public Map<String,Object> mainImg(
			   @PathVariable("product_id") String productId){
		   
		   Map<String, Object> image = imgDAO.mainImg(productId);
		   
		   return image;
	   }
	   
	   
 }

