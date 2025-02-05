package com.babyloop.config;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class PropertyConfig {

	@Bean(name="myprops")
	public PropertiesFactoryBean propertiesFactoryBean() {
		PropertiesFactoryBean propertiesFactoryBean = 
				new PropertiesFactoryBean();
		ClassPathResource classPathResource = 
				new ClassPathResource("my.properties");
		propertiesFactoryBean.setLocation(classPathResource);
		return propertiesFactoryBean;
	}
}
