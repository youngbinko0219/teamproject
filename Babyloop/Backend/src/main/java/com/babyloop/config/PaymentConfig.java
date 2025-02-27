package com.babyloop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class PaymentConfig {

//	@Value("#{payment['portone.imp-key']}")
//	private String portoneImpKey;
//	
//	@Value("#{payment['portone.imp-secret']}")
//	private String portoneImpSecret;
//	
//	@Value("#{payment['portone.kakao-mid']}")
//	private String portoneKakaoMid;
//	
//	@Value("#{payment['portone.kakao-channel-key']}")
//	private String portoneKakaoChannelKey;
		
	@Value("#{payment['toss-secret-key']}")
	private String tosSecretKey;
}
