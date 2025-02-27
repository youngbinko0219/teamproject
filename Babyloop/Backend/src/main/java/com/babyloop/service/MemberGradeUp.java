package com.babyloop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.babyloop.auth.repository.IGradesMapper;

@Service
public class MemberGradeUp {

	@Autowired
	IGradesMapper gradesDAO;
	
	@Transactional
	public void upgrade(String userId) {
		
		/*등급업*/
		gradesDAO.gradeUp(userId);
	}
}
