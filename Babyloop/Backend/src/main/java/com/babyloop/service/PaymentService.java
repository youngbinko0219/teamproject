package com.babyloop.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.babyloop.config.PaymentConfig;
import com.babyloop.payment.repository.ConfirmDTO;
import com.babyloop.payment.repository.IRentalsMapper;
import com.babyloop.payment.repository.RentalsDTO;

@Service
public class PaymentService {

	@Autowired
	private  IRentalsMapper rentalsDAO;
	
	@Autowired
	private RestTemplate restTemplate;
	
	/*토스페이 시크릿키*/
	@Autowired
	private PaymentConfig paymentKey;
	
	
	/*일반 결제 승인 요청*/
	@Transactional
	public void confirmPayment(ConfirmDTO confirmDTO){
		
		System.out.println("여기 옴");
		/*요청 보낼 URL*/
		String url = "https://api.tosspayments.com/v1/payments/confirm";
		
		/*토스페이먼츠에서 요구한 인증 방식으로 설정
		 * Authorization 에 Basic {시크릿키} : 형식으로 Base64로
		 * 인코딩 하여 보냄*/
		String basic = Base64.getEncoder().encodeToString(
				(paymentKey.getTosSecretKey()+":").getBytes(StandardCharsets.UTF_8));
		
		
		HttpHeaders headers = new HttpHeaders();
		/*JSON형식 요청*/
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Basic "+basic);
		
		Map<String, Object> map = new HashMap<>();
		/*Front(리액트)에서 주는 키*/
		map.put("paymentKey", confirmDTO.getPaymentKey());
		map.put("orderId",confirmDTO.getOrderId());
		map.put("amount", confirmDTO.getAmount());
		
//		System.out.println("여기까지옴");
//		System.out.println(headers);
		
		/*요청 
		 *바디(map), 헤서(headers) 생성*/
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(map,headers);
		
		/*restTemplate.exchange
		 * 1. URL
		 * 2. 요청 method
		 * 3. 요청 보낼 타입
		 * 4. 응답 받을 타입*/
		ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
				url,
				HttpMethod.POST,
				requestEntity,
				new ParameterizedTypeReference<Map<String, Object>>() {}
				);
		
		/*응답 바디를 JSON형식을 변환*/
		Map<String, Object> responseMap = responseEntity.getBody();
		
		/*승인 여부*/
		Map<String, Object> resultMap = new HashMap<>();
		
		switch (responseEntity.getStatusCode()) {
        case HttpStatus.OK:
            try {
//                RentalsDTO rentalsDTO = new RentalsDTO();
                
                /*정보 저장*/
//                rentalsDTO.setPayment_key(confirmDTO.getPaymentKey());
//                rentalsDTO.setRental_id(confirmDTO.getOrderId());
//                rentalsDTO.setTotal_price(confirmDTO.getAmount());
//                Object approvedAt = responseMap.get("approvedAt");
//                rentalsDTO.setApproved_at(
//                        approvedAt != null ? approvedAt.toString() : null);
//                
//                rentalsDAO.insertPayment(rentalsDTO);
                
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
            break;
            
        case HttpStatus.NOT_FOUND:
            resultMap.put("message", "404 - 요청한 리소스를 찾을 수 없습니다.");
            resultMap.put("tossResponse", responseMap);
            break;
            
        case HttpStatus.INTERNAL_SERVER_ERROR:
            resultMap.put("message", "500 - 서버 내부 오류가 발생했습니다.");
            resultMap.put("tossResponse", responseMap);
            break;
            
        default:
            resultMap.put("message", "알 수 없는 오류 발생");
            resultMap.put("tossResponse", responseMap);
            break;
		}
	}
	
	
	/*가상 계좌이체 요청*/
	@Transactional
	public void virtualAccounts(RentalsDTO rentalsDTO){
		
		/*요청 보낼 URL*/
		String url = "https://api.tosspayments.com/v1/virtual-accounts";
		
		/*토스페이먼츠에서 요구한 인증 방식으로 설정
		 * Authorization 에 Basic {시크릿키} : 형식으로 Base64로
		 * 인코딩 하여 보냄*/
		String basic = Base64.getEncoder().encodeToString(
				(paymentKey+":").getBytes(StandardCharsets.UTF_8));
		
		HttpHeaders headers = new HttpHeaders();
		/*JSON형식 요청*/
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Basic"+basic);
		
		/*결제승인에 필요한 토스페이먼츠가 요구한
		 * 내용을 구성*/
		Map<String, Object> map = new HashMap<>();
		/*Front(리액트)에서 주는 키*/
		map.put("orderName", "");
		map.put("orderId","rental_"+rentalsDTO.getRental_id());
		map.put("amount", rentalsDTO.getTotal_price());
		map.put("customerName", "");
		map.put("bank", "");
		/*은행 번호
		 * 부산은행 : 32
		 * 새마을금고 : 45
		 * 신한은행 : 88
		 * 신협 : 48
		 * 우리은행 : 20
		 * 카카오뱅크 : 90
		 * 케이뱅크 : 89
		 * 토스뱅크 : 92
		 * 하나은행 : 81
		 * KB국민은행 : 06
		 * IBK기업은행 : 03
		 * NH농협은행 : 11
		 * 제주은행 : 35
		 * */
		
		
		/*요청 
		 *바디(map), 헤서(headers) 생성*/
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(map,headers);
		
		/*restTemplate.exchange
		 * 1. URL
		 * 2. 요청 method
		 * 3. 요청 보낼 타입
		 * 4. 응답 받을 타입*/
		ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
				url,
				HttpMethod.POST,
				requestEntity,
				new ParameterizedTypeReference<Map<String, Object>>() {}
				);
		
		/*응답 바디를 JSON형식을 벼환*/
		Map<String, Object> responseMap = responseEntity.getBody();
		
		
		/*승인 여부*/
		Map<String, Object> resultMap = new HashMap<>();
		if(responseEntity.getStatusCode()== HttpStatus.OK) {
			try {
				/*승인 날짜 가져오기*/
				Object approvedAt = responseMap.get("approvedAt");
				rentalsDTO.setApproved_at(
						approvedAt != null ? approvedAt.toString() : null);
				
				rentalsDAO.insertPayment(rentalsDTO);
				
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
			
		}else {
			resultMap.put("message", "결제 승인 실패");
			resultMap.put("tossResponse", responseMap);
		}
	}
	
}
