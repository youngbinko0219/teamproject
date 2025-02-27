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
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.product.repository.IImgMapper;
import com.babyloop.product.repository.IReviewMapper;
import com.babyloop.product.repository.LikesDTO;
import com.babyloop.product.repository.ReviewDTO;

@RestController
@RequestMapping("/reviews")
public class ReviewCtrl {

   @Autowired
   IReviewMapper reviewDAO;
   
   @Autowired
   IImgMapper imgDAO;
   
   @Autowired
   TransactionTemplate transaction;
   
   
   /**
    * 리뷰에대한 신고
    * @param userId : 댓글을 작성한 user_id
    * @return
    */
   @PostMapping("/{user_id}")
   public Map<String, String> reviewsDuration(
         @PathVariable("user_id") String userId){
      
      Map<String, String> map = new HashMap<>();
      
      /*신고대상 중복 체크*/
      String check = reviewDAO.durationCheck(userId);
      
      if(check == null) {
         /*신규 리뷰 신고*/
         reviewDAO.durationUser(userId);
         map.put("message", "success");
         return map;
      }
      
      /*신고 업데이트*/
      reviewDAO.updateDuration(userId);
      map.put("message", "success");
      
      return map;
   }
   
   
   /**
    * 리뷰 목록
    * @PathVariable productId : 리뷰 상품
    * @return : 회원의 좋아요 상태 반환
    */
   @GetMapping("/{product_id}/list")
   public List<Map<String, Object>> likeStatus(
           @PathVariable("product_id") String productId) {
          
       try {
          /*리뷰 목록*/
          ArrayList<Map<String,Object>> reviews = reviewDAO.reviewList(productId);
          
          for(Map<String, Object> review : reviews) {
             ReviewDTO reviewDTO = new ReviewDTO();
             
             int reviewId = (Integer) review.get("review_id");
             
             reviewDTO.setReview_id(reviewId);
             
             ArrayList<String> images = imgDAO.reviewImg(reviewDTO.getReview_id());
             review.put("images", images);
          }
          
          return reviews;
          
       } catch (Exception e) {
           e.printStackTrace();
           throw new RuntimeException(e);
       }
   }
   
   
   /**
    * 좋아요 증감
    * @param productId : 좋아요 한 상품
    * @return  좋아요 증가후 성공여부
    */
   @PutMapping("/{review_id}/like")
   public Map<String, String> likeUp(
         @PathVariable("review_id") String reviewId){
      
      Map<String, String> map = new HashMap<>();
      try {
            int result = reviewDAO.likeUp(reviewId);
            
            if(result == 1) {
               map.put("message","success");
            }else {
               throw new RuntimeException("좋아요 실패");
            }
            
            return map;
         
      } catch (Exception e) {
         e.printStackTrace();
         throw new RuntimeException(e);
      }
   }
}
