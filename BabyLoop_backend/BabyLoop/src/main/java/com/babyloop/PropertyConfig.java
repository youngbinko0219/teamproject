package com.babyloop;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

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
