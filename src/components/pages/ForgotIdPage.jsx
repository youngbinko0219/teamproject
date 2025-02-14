import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // 로고 이미지 경로
import "../../assets/css/pages/ForgotIdPage.css";

const ForgotIdPage = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await fetch("http://localhost8080/auth/search_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // 이메일 데이터를 JSON 형태로 전송
      });

      if (response.ok) {
        const data = await response.json();
        console.log("서버 응답 데이터:", data);
        // API에서 받은 응답에 따른 처리
        setResponseMessage("이메일 전송이 성공적으로 완료되었습니다.");
      } else {
        setResponseMessage("이메일 전송에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="forgot-id-container">
      {/* 로고 영역 */}
      <div className="logo-container">
        <img src={logo} alt="로고" className="logo-image" />
      </div>

      {/* 아이디 찾기 폼 */}
      <div className="forgot-id-card">
        <h2 className="forgot-id-title">아이디 찾기</h2>
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              이메일
            </label>
            <input
              type="email"
              className="input-field"
              id="email"
              placeholder="회원 가입 시 사용한 이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 아이디 찾기 버튼 */}
          <button type="submit" className="submit-button">
            아이디 찾기
          </button>
        </form>

        {/* 결과 메시지 표시 */}
        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}

        {/* 회원가입 유도 문구 */}
        <div className="signup-link-container">
          <span className="signup-text">계정이 없으신가요? </span>
          <Link to="/signup" className="signup-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotIdPage;
