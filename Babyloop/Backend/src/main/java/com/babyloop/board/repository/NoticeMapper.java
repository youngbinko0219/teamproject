package com.babyloop.board.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface NoticeMapper {

	/*공지 입력*/
	public int insertNotice(NoticeDTO noticeDTO);
	
	/*공지 목록(페이징)*/
	public ArrayList<Object> listNotice(
			@Param("limit") int limit,
			@Param("offset") int offset);
	
	public int countNotice();
}
