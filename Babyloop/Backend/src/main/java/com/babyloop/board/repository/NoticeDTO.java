package com.babyloop.board.repository;

import lombok.Data;

@Data
public class NoticeDTO {

	private int notice_id;
	private String notice_title;
	private String notice_com;
	private String created_at;
}
