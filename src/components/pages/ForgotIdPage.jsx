import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // 로고 이미지 경로
import axios from "axios";
import "../../assets/css/pages/ForgotIdPage.css";

const ForgotIdPage = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await axios.get("http://localhost:8080/auth/search-id", {
        params: { email },
      });

      if (response.status === 200 && response.data.message === "success") {
        console.log("서버 응답 데이터:", response.data);
        // 이메일에 해당하는 아이디가 있는 경우
        setResponseMessage(
          `입력하신 이메일로 가입된 아이디는 ${response.data.user_id} 입니다.`
        );
      } else {
        console.error("아이디 확인 실패", response);
        setResponseMessage(
          "입력하신 이메일로 가입된 아이디가 존재하지 않습니다."
        );
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
          <Link to="/terms-agreement" className="signup-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotIdPage;
