import { useEffect, useState } from "react";
import axios from "axios";

const MessagesPage = () => {
  // 백엔드에서 받아올 메시지 리스트
  const [messages, setMessages] = useState([]);
  // 정지 기간 선택 상태
  const [blockDuration, setBlockDuration] = useState("3");

  // 페이지 로드시 메시지 목록을 가져옵니다.
  useEffect(() => {
    fetchMessages();
  }, []);

  // 메시지 목록을 백엔드에서 가져오는 함수
  const fetchMessages = async () => {
    try {
      // 예시: GET /api/messages
      // 백엔드에서 '신고 카운트가 5회 이상인 데이터'만 보내도록 설정
      const response = await axios.get("/admin/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // 정지 버튼을 눌렀을 때 실행되는 함수
  const handleBlockUser = async (userId) => {
    try {
      // 예시: POST /api/block
      // body: { userId, duration: blockDuration }
      await axios.post("/admin/block", {
        userId,
        duration: blockDuration,
      });
      alert(`유저(ID: ${userId})가 ${blockDuration}일 동안 정지되었습니다.`);
      // 정지 후 필요한 경우 메시지 목록 재조회 등
      fetchMessages();
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>쪽지 페이지</h2>
      <p>
        신고 카운트가 5회 이상인 메시지에 대해 쪽지 확인 및 정지 처리를 할 수
        있습니다.
      </p>
      {/* 메시지 목록 표시 (테이블 예시) */}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>유저 ID</th>
            <th>메시지 내용</th>
            <th>신고 카운트</th>
            <th>정지</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="4">표시할 메시지가 없습니다.</td>
            </tr>
          ) : (
            messages.map((message) => (
              <tr key={message.id}>
                <td>{message.userId}</td>
                <td>{message.content}</td>
                <td>{message.reportCount}</td>
                <td>
                  {/* 정지 기간 선택 */}
                  <select
                    value={blockDuration}
                    onChange={(e) => setBlockDuration(e.target.value)}
                    style={{ marginRight: "8px" }}
                  >
                    <option value="3">3일</option>
                    <option value="7">7일</option>
                    <option value="30">30일</option>
                  </select>
                  {/* 정지 버튼 */}
                  <button onClick={() => handleBlockUser(message.userId)}>
                    정지
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesPage;
