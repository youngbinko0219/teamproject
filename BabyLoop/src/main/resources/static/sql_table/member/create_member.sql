#회원 관리 생성
create table member(
	user_idx int AUTO_INCREMENT PRIMARY KEY, #고유번호
	grade_idx int, #등급 고유번호
	user_id varchar(20) NOT NULL, #아이디
	user_pw varchar(255) NOT NULL, #비번
	user_name varchar(100) NOT NULL, #이름
	user_email varchar(100) NOT NULL, #이메일
	user_phone varchar(20) NOT NULL, #전화번호
	user_addr1 varchar(200) NOT NULL, #우편번호
	user_addr2 varchar(200) NOT NULL, #주소
	user_addr3 varchar(200) NOT NULL, #상세주소
	user_gender varchar(20) NOT NULL, #성별
	user_birth date, #생년월일
	created_at date DEFAULT CURRENT_TIMESTAMP, #가입일
	points int DEFAULT 3000,
	login_type varchar(100) NOT NULL #로그인 수단
);


#회원관리 테이블 삭제
DROP TABLE member;