//package com.babyloop.service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import com.babyloop.config.PaymentConfig;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import lombok.AllArgsConstructor;
//
////@AllArgsConstructor
//@Service
//public class PortOnePaymentService {
//
//	private final PaymentConfig paymentConfig;
////	private final RestTemplate restTemplate;
//	private final ObjectMapper objectMapper;
//	
//	
//	/*PotOnt의 토큰 요청
//	 * ResponseEntity 사용으로 더세밀한 응답 요청
//	 * */
//	public ResponseEntity<Map<String, String>> getPortOneAccessTokenString() throws Exception{
//		
//		String url = "https://api.iamport.kr/users/getToken";
//		
//		/*요청 본문 JSON 형식*/
//		Map<String, String> requestBody = new HashMap<>();
//		requestBody.put("imp_key", paymentConfig.getPortoneImpKey());
//		requestBody.put("imp_secret", paymentConfig.getPortoneImpSecret());
//		
//		/*HTTP 헤더*/
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
//	
//		/*PortOne에 요청을 보냄*/
////		ResponseEntity<String> response = restTemplate.postForEntity(url, request,  String.class);
//		
////		if(response.getStatusCode() == HttpStatus.OK) {
//			/*성공시*/
////			JsonNode jsonResponse = objectMapper.readTree(response.getBody());
//			Map<String, String> responseBody = Map.of("accessToken", jsonResponse.path("response").path("access_token").asText());
//			
//			return ResponseEntity.ok(responseBody);
//		
////		}else {
//			throw new RuntimeException("PortOne 실패");
//		}
//	}
//	
//	
//	/*실제 결제 요청
//	 * ResponseEntity 사용으로 더세밀한 응답 요청
//	 * */
//	public ResponseEntity<Map<String,String>> requestPayment(String impUid, int totalPrice)throws Exception{
//		
//		/*토큰 가져오기*/
//		String accessToken = getPortOneAccessTokenString().getBody().get("accessToken");
//		
//		String url = "http://api.iamport.kr/payments/"+ impUid;
//		
//		/* HTTP 헤더 설정 하기 */
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		headers.set("Authorization", "Bearer " + accessToken);
//		
//		/* 요청 본문 생성 */
//		Map<String, Object> requestBody = new HashMap<>();
//		
//		/* 결제금액 설정 */
//		requestBody.put("amount", totalPrice);
//		
//		HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//		
//		/* 결제 요청 */
//		ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//		
//		
//		/* 최종 응답 확인*/
//		if(response.getStatusCode() == HttpStatus.OK) {
//			/* 성공시 */
//			JsonNode jsonResponse = objectMapper.readTree(response.getBody());
//			Map<String, String> responseBody = Map.of(
//					"status", jsonResponse.path("response")
//					.path("status").asText(),
//					"message", "success");
//		
//			return ResponseEntity.ok(responseBody);
//		}else {
//			throw new RuntimeException("결제 실패");
//		}
//	}
	
//}
