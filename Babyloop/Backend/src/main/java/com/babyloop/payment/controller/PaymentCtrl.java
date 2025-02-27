package com.babyloop.payment.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.auth.repository.GradesDTO;
import com.babyloop.auth.repository.IGradesMapper;
import com.babyloop.auth.repository.MemberDTO;
import com.babyloop.payment.repository.ConfirmDTO;
import com.babyloop.payment.repository.IRentalsMapper;
import com.babyloop.payment.repository.RentalsDTO;
import com.babyloop.product.repository.IPayinfoMapper;
import com.babyloop.product.repository.PayinfoDTO;
import com.babyloop.product.repository.ProductsDTO;
import com.babyloop.service.FirebaseStorageService;
import com.babyloop.service.MemberGradeUp;
import com.babyloop.service.PaymentService;
import com.babyloop.service.PdfService;

import org.springframework.web.bind.annotation.PutMapping;


//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.babyloop.service.PortOnePaymentService;
//
//@RestController
//@RequestMapping("/payment")
//public class PaymentCtrl {
//
//	@Autowired
//	private PortOnePaymentService paymentService;
//	
//	
//	/**
//	 * 결제시 토큰 발급 신청
//	 * @return 토큰을 발급
//	 * @throws Exception
//	 */
//	@GetMapping("/token")
//	public Map<String, String> getAccessToken()throws Exception{
//		
//		return paymentService.getPortOneAccessTokenString()
//				.getBody();
//	}
//
//	
//	@PostMapping("/request")
//	public Map<String, String> requestPayment(
//			@Requ){
//		
//	}
//
//}
//

@RestController
@RequestMapping("/payments")
public class PaymentCtrl {

	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private IRentalsMapper rentalsDAO;
	
	@Autowired
	private IPayinfoMapper payinfoDAO;
	
	@Autowired
	private IGradesMapper gradesDAO;
	
	@Autowired
	PdfService pdf;
	
	@Autowired
	MemberGradeUp up;
	
	@Autowired
	FirebaseStorageService firebase;
	
	
	@PostMapping("/rentals")
	public Map<String, String> payment(@RequestBody ConfirmDTO confirmDTO){
		
		Map<String, String> map = new HashMap<>();
			
		paymentService.confirmPayment(confirmDTO);
		
		try {
//			PayinfoDTO payinfoDTO = new PayinfoDTO();
//			payinfoDTO.setPayment_method(confirmDTO.getPayment_method());
//			payinfoDTO.setUser_addpoints(confirmDTO.getUser_addpoints());
//			payinfoDTO.setUser_depoints(confirmDTO.getUser_depoints());
//			payinfoDTO.setCreated_at(confirmDTO.getPointCreated_at());
			
		
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		map.put("message", "success");
		
		return map;
		
	}
	
	/**
	 * 결제 성공후 영수증 포인트 처리
	 * @param userId
	 * @param payinfoDTO
	 * @return
	 */
	@PutMapping("/{user_id}/point")
	public Map<String, Object> putMethodName(
			@PathVariable("user_id") String userId,
			@RequestBody PayinfoDTO payinfoDTO) {
		
		Map<String, Object> map = new HashMap<>();
		
		try {
			/*포인트 내역 저장*/
			payinfoDAO.pointPayment(payinfoDTO, userId);
			
			/*상품 추가 포인트*/
			gradesDAO.productPoint(payinfoDTO, userId);
			
			/*상품 차감 포인트*/
			gradesDAO.productDePoint(payinfoDTO, userId);
			
			/*등급업*/
			up.upgrade(userId);
			
			
			map.put("message", "success");
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("내역저장 오류");
		}
	}
	
	
	@PostMapping("/{user_id}/ok")
	public Map<String, Object> ok(
			@PathVariable("user_id") String userId,
			@RequestParam("end") int end,
			@RequestParam("start") String start,
			@RequestBody List<ProductsDTO> productsDTO){
		
		Map<String, Object> map = new HashMap<>();
		
		MemberDTO memberDTO = new MemberDTO();
		RentalsDTO rentalsDTO = new RentalsDTO();
		
		int total = 0;
		for (ProductsDTO product : productsDTO) {
			total+= product.getPrice(); //총 금액		
		}
		
		/*rental_end 생성*/
		LocalDate currentDate = LocalDate.parse(start);
		LocalDate rentalEnd = currentDate.plusDays(end);
		
		/*대여 목록 저장
		 * rental_id 자동매핑 설정*/
		rentalsDAO.insertRentals(userId, total, rentalEnd, start);
		int rentalGet = rentalsDTO.getRental_id();
		String rentalId = String.valueOf(rentalGet);
		System.out.println(rentalId);
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String nowdate = currentDate.format(formatter);
        /*데이터 저장*/
        rentalsDTO.setCreated_at(nowdate);
        memberDTO.setUser_id(userId);
        
        int userPoint = rentalsDAO.userPoint(userId);
        memberDTO.setPoints(userPoint);
        
		int stockSize = 0;
		for (ProductsDTO product : productsDTO) {
			stockSize+= product.getQuantity(); //총 금액		
		}
		
		int productSize = productsDTO.size();
		
		int pointSize = 0;
		for (ProductsDTO product : productsDTO) {
			pointSize+= product.getUser_addpoints(); //총 금액		
		}
		
		
		/*영수증 생성
		 * html템플릿*/
		String htmlContent = pdf.generateHtmlTemplate(memberDTO,
				productsDTO,rentalsDTO, stockSize, productSize,
				total, pointSize, start);
		
		try {
			/*pdf로 변환*/
			byte[] pdfBytes = pdf.generatePdf(htmlContent);
			
			String url =firebase.uploadPdf(pdfBytes,
										rentalId);
			
			map.put("url",url);
			
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("pdf실패");
		}
		
	}


}