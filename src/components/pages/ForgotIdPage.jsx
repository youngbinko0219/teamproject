import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // 로고 이미지 경로
import "../../assets/css/pages/ForgotIdPage.css";

const ForgotIdPage = () => {
  return (
    <div className="forgot-id-container">
      {/* 로고 영역 */}
      <div className="logo-container">
        <img src={logo} alt="로고" className="logo-image" />
      </div>

      {/* 아이디 찾기 폼 */}
      <div className="forgot-id-card">
        <h2 className="forgot-id-title">아이디 찾기</h2>
        <form>
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
            />
          </div>

          {/* 아이디 찾기 버튼 */}
          <button type="submit" className="submit-button">
            아이디 찾기
          </button>
        </form>

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
