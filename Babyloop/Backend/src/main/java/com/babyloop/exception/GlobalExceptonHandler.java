package com.babyloop.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptonHandler {
	
	// RuntimeException을 별도로 처리하는 핸들러
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<Map<String,String>> handleRuntimeException(
			RuntimeException e){
		
		Map<String,String> resp = new HashMap<>();
		
		//메시지 내용
		resp.put("error", e.getMessage());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
	}
	
	
	// IllegalArgumentException을 별도로 처리하는 핸들러
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException e) {
        Map<String, String> resp = new HashMap<>();
        resp.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
    }
}
