package com.klef.cicd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.SpringBootCondition;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class FarmerapiSpringbootApplication extends SpringBootServletInitializer{

	public static void main(String[] args){
		SpringApplication.run(FarmerapiSpringbootApplication.class, args);
		System.out.println("Project is Running...!!!");
	}

}
