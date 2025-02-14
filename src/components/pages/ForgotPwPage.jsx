import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/pages/ForgotPwPage.css";
import logo from "../../assets/images/logo.png";

const ForgotPwPage = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.0.16:8080/auth/search_pw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email }),
      });

      if (response.ok) {
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
    <div className="forgot-pw-container">
      {/* 로고 영역 */}
      <div className="logo-container">
        <img src={logo} alt="로고" className="logo-image" />
      </div>

      {/* 카드 영역 */}
      <div className="forgot-pw-card">
        <h2 className="forgot-pw-title">비밀번호 찾기</h2>
        <form onSubmit={handleSubmit}>
          <div className="forgot-pw-form-group">
            <label htmlFor="userId" className="forgot-pw-label">
              아이디
            </label>
            <input
              type="text"
              id="userId"
              className="forgot-pw-input"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="forgot-pw-form-group">
            <label htmlFor="email" className="forgot-pw-label">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="forgot-pw-input"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-pw-button">
            비밀번호 찾기
          </button>
        </form>

        {/* API 응답 메시지 영역 */}
        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}

        {/* 회원가입 링크 영역 */}
        <div className="forgot-pw-signup-container">
          <span className="forgot-pw-signup-text">계정이 없으신가요?</span>
          <Link to="/signup" className="forgot-pw-signup-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwPage;
