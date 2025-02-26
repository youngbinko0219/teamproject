//src/components/pages/LoginPage.jsx
import LoginForm from "../auth/LoginForm";
import LoginButton from "../auth/LoginButton";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore.jsx";
import "../../assets/css/pages/LoginPage.css";

const LoginPage = () => {
  // 훅은 컴포넌트 최상위에서 호출해야 합니다.
  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        user_id: credentials.username,
        user_pw: credentials.password,
      });
      // 응답 데이터 구조분해, message를 responseMessage로 명명
      const { message, token } = response.data;
      if (message === "success") {
        localStorage.setItem("accessToken", token);
        // 필요한 경우 store 업데이트를 위해 login() 호출 가능
        login(credentials.username);
        navigate("/");
      } else {
        alert(message || "아이디와 비밀번호를 확인해 주세요.");
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
