import { useNavigate } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import LoginButton from "../auth/LoginButton";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/css/pages/LoginPage.css";
import useUserStore from "../../hooks/useUserStore";

const LoginPage = () => {
  // store에서 login 관련 함수를 불러옵니다.
  const { login } = useUserStore((state) => ({
    login: state.login,
  }));

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        user_id: credentials.username,
        user_pw: credentials.password,
      });
      // 응답 데이터 구조분해, message를 responseMessage로 명명
      const { message: responseMessage, accessToken } = response.data;
      if (responseMessage === "success") {
        localStorage.setItem("accessToken", accessToken);
        login(credentials.username); // 로그인 상태 업데이트
        navigate("/"); // react-router-dom을 이용하여 페이지 이동
      } else {
        alert(responseMessage || "아이디와 비밀번호를 확인해 주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.response) {
        alert(`로그인 실패: ${error.response.data.message}`);
      } else {
        alert("로그인 실패! 서버 연결 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* 로고 */}
        <div className="auth-logo">
          <Link to="/">
            <img src={logo} alt="Babyloop Logo" />
          </Link>
        </div>

        {/* 로그인 폼 */}
        <LoginForm onSubmit={handleLogin} />

        {/* 소셜 로그인 버튼 */}
        <div className="login-button-container">
          <LoginButton />
        </div>

        {/* 회원가입 링크 */}
        <div className="signup-link">
          계정이 없으신가요?{" "}
          <Link to="/terms-agreement" className="text-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
