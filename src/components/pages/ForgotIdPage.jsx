import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // 로고 이미지 경로
import "../../assets/css/pages/ForgotIdPage.css";

const ForgotIdPage = () => {
  return (
    <div className="container mt-5">
      {/* 로고 영역 */}
      <div className="text-center mb-5">
        <img
          src={logo}
          alt="로고"
          style={{ width: "200px", marginBottom: "2rem" }}
        />
      </div>

      {/* 아이디 찾기 폼 */}
      <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">아이디 찾기</h2>
        <form>
          {/* 이메일 입력 필드 */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="회원 가입 시 사용한 이메일을 입력하세요"
            />
          </div>

          {/* 아이디 찾기 버튼 */}
          <button type="submit" className="btn btn-primary w-100 py-2">
            아이디 찾기
          </button>
        </form>

        {/* 회원가입 유도 문구 */}
        <div className="text-center mt-4">
          <span className="text-muted">계정이 없으신가요? </span>
          <Link to="/signup" className="text-primary text-decoration-none">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotIdPage;
