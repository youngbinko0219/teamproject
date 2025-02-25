// src/pages/admin/Message.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/admin/Message.css";

const MessagePage = () => {
  // 백엔드에서 받아올 메시지 데이터를 report와 stock으로 구분
  const [messages, setMessages] = useState({ report: [], stock: [] });
  // 정지 기간 선택 상태 (기본값 3일)
  const [blockDuration, setBlockDuration] = useState("3");

  // 페이지 로드시 메시지 목록을 가져옵니다.
  useEffect(() => {
    fetchMessages();
  }, []);

  // 백엔드에서 메시지 데이터를 가져오는 함수
  const fetchMessages = async () => {
    try {
      const response = await axios.get("/admin/messages");
      console.log("response.data:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages({ report: [], stock: [] });
    }
  };

  // 정지 버튼 클릭 시 실행되는 함수 (선택된 blockDuration 적용)
  const handleBlockUser = async (userId) => {
    try {
      await axios.post("/admin/block", {
        userId,
        duration: blockDuration,
      });
      alert(`유저(ID: ${userId})가 ${blockDuration}일 동안 정지되었습니다.`);
      // 정지 후 메시지 목록 재조회
      fetchMessages();
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };

  return (
    <div className="admin-msg-container">
      <h2 className="admin-msg-main-title">쪽지 페이지</h2>
      <p>
        신고 카운트가 5회 이상인 메시지에 대해 쪽지 확인 및 정지 처리를 할 수
        있습니다.
      </p>

      {/* 신고 메시지 섹션 */}
      <h3 className="admin-msg-section-title">신고 메시지</h3>
      <table className="admin-msg-table">
        <thead>
          <tr>
            <th>유저 ID</th>
            <th>메시지 내용</th>
            <th>신고 카운트</th>
            <th>정지</th>
          </tr>
        </thead>
        <tbody>
          {messages.report && messages.report.length > 0 ? (
            messages.report.map((message) => (
              <tr key={message.messages_id}>
                <td>{message.user_id}</td>
                <td dangerouslySetInnerHTML={{ __html: message.content }}></td>
                <td>{message.report_count}</td>
                <td>
                  <select
                    className="admin-msg-select"
                    value={blockDuration}
                    onChange={(e) => setBlockDuration(e.target.value)}
                  >
                    <option value="3">3일</option>
                    <option value="7">7일</option>
                    <option value="30">30일</option>
                  </select>
                  <button
                    className="admin-msg-btn"
                    onClick={() => handleBlockUser(message.user_id)}
                  >
                    정지
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">표시할 메시지가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 재고 알림 섹션 */}
      <h3 className="admin-msg-section-title">재고 알림</h3>
      <table className="admin-msg-table">
        <thead>
          <tr>
            <th>상품 ID</th>
            <th>상품명</th>
            <th>메시지 내용</th>
          </tr>
        </thead>
        <tbody>
          {messages.stock && messages.stock.length > 0 ? (
            messages.stock.map((msg) => (
              <tr key={msg.messages_id}>
                <td>{msg.product_id}</td>
                <td>{msg.product_name}</td>
                <td dangerouslySetInnerHTML={{ __html: msg.content }}></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">표시할 메시지가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessagePage;
