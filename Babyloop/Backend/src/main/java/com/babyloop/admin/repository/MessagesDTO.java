package com.babyloop.admin.repository;

import lombok.Data;

@Data
public class MessagesDTO {

	private int report_id; //신고번호
	private String user_id; // 아이디
	private int report_count; //신고 횟수
	private int read_status; //읽음 처리
}
