package com.babyloop.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.repository.IMemberMapper;
import com.babyloop.auth.repository.MemberDTO;
import com.babyloop.product.repository.IProductsMapper;

@RestController
@RequestMapping("/admin")
public class AdminMemberCtrl {

	
	@Autowired
	IMemberMapper memberDAO;
	
	@Autowired
	IProductsMapper productsDAO;
	
	
    /**
     * 관리자 회원목록
     * @RequestParam "page" : 페이징 페이지
     * @RequestParam "size" : 페이지 사이즈
    */
    @GetMapping("/users")
    public Map<?,?> allProducts(
    		@RequestParam(name="page", defaultValue="1") int page,
    		@RequestParam(name="size", defaultValue="10") int size){
    	
    	int offset = (page - 1) * size;
    	
    	List<?> members = memberDAO.adminMember(size, offset);
    	
    	int totalCount = memberDAO.countMember();
    	
    	Map<String, Object> map = new HashMap<>();
    	
    	map.put("users", members);
    	map.put("totalCount", totalCount);
    	map.put("page", page);
    	map.put("totalPages", (int) Math.ceil((double) totalCount / size));
    	
    	return map;
    	
    }
    
    
    /**
     * 관리자 회원 정지
     * @RequestParam user_id : 정지되는 사용자
     * @RequestParam duration : 1->3일
     * 							2->7일
     * 							3->30일
     * @return : 날짜 지정후 성공
     */
    @PutMapping("/block")
    public Map<String, Object> userBan(
    		@RequestBody MemberDTO memberDTO) {

    	Map<String, Object> map = new HashMap<>();
    	try {
    		System.out.println(memberDTO.getDuration());
    		/*정지 날짜 지정*/
    		if(memberDTO.getDuration()==1) {
    			memberDTO.setDuration(3);
    		}else if(memberDTO.getDuration()==2){
    			memberDTO.setDuration(7);
    		}else if(memberDTO.getDuration()==3) {
    			memberDTO.setDuration(30);
    		}
    		
    		/*회원 정지 날짜 지정*/
    		int result = memberDAO.userBan(memberDTO);
			
    		if(result >=1) {
    			map.put("message","success");
    		}else {
    			throw new RuntimeException("정지 실패!");
    		}
    		
    		return map;
    		
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
    }
    
    
    /**
     * 메시지 목록
     * @return : 회원정지 & 상품재고
     */
	@GetMapping("/messages")
	public Map<String,Object> sendMessages(){
		
		Map<String, Object> map = new HashMap<>();
		
		/*정지 리스트*/
		List<Map<String, Object>> reportlist = new ArrayList<>();
		HashMap<String,Object> report = memberDAO.messageList();
		
		if(report == null) {
			return map;
		}
		reportlist.add(report);
		
		report.put("content", report.get("user_id")
				+ " 회원님이 5회이상 신고 받았습다!<br/>"
				+ "신고 승인 바랍니다.");
		map.put("report",reportlist);
		
		/*재고량 메시지*/
		List<Map<String, Object>> stocklist = new ArrayList<>();
		HashMap<String,Object> stock = productsDAO.stockMessage();
		
		if(stock == null) {
			return map;
		}
		stocklist.add(stock);
		
		stock.put("content", stock.get("product_name")
				+"의 상품의 재고량이 0입니다.");
		map.put("stock", stocklist);
		
		return map;
	}
    
}
