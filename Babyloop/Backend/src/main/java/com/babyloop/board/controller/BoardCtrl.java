package com.babyloop.board.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.babyloop.board.repository.NoticeDTO;
import com.babyloop.board.repository.NoticeMapper;

@RestController
@RequestMapping("/board")
public class BoardCtrl {

	@Autowired
	NoticeMapper noticeDAO;
	
	/**
	 * 공지사항
	 * @param noticeDTO : 공지사항 내용
	 * @return
	 */
	@PostMapping("/notice")
	public Map<String, String> createNotice(
			@RequestBody NoticeDTO noticeDTO){
		
		Map<String, String> map = new HashMap<>();
		
		try {
			int result = noticeDAO.insertNotice(noticeDTO);
			
			if(result!=1) {
				throw new RuntimeException("등록 실패!");
			}
			map.put("message", "success");			
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("에러",e);
		}
		return map;
	}
	
	
	@GetMapping("/notice")
	public Map<?,?> listNotice(
			@RequestParam(name="page", defaultValue="1") int page,
    		@RequestParam(name="size", defaultValue="10") int size){
		
		int offset = (page - 1) * size;
		
		List<?> notice = noticeDAO.listNotice(size, offset);
		int totalCount = noticeDAO.countNotice();
		
		Map<String, Object> map = new HashMap<>();
		
    	map.put("notice", notice);
    	map.put("totalCount", totalCount);
    	map.put("page", page);
    	map.put("totalPages", (int) Math.ceil((double) totalCount / size));
		
		return map;
	}
}
