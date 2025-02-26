//src/components/pages/LoginPage.jsx
import LoginForm from "../auth/LoginForm";
import LoginButton from "../auth/LoginButton";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore.jsx";
import "../../assets/css/pages/LoginPage.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const login = useUserStore((state) => state.login);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        user_id: credentials.username,
        user_pw: credentials.password,
      });
      const { message, token } = response.data;
      if (message === "success") {
        localStorage.setItem("accessToken", token);
        login(credentials.username);

        // 로그인 성공 후 /user/{user_id} API 호출
        const userResponse = await axios.get(
          `http://localhost:8080/user/${credentials.username}`
        );
        const userData = userResponse.data;
        setUserInfo(userData); // 받은 사용자 정보를 zustand에 저장

        navigate("/");
      } else {
        toast.error(message || "아이디와 비밀번호를 확인해 주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.response) {
        toast.error(`로그인 실패: ${error.response.data.message}`);
      } else {
        toast.error("로그인 실패! 서버 연결 문제가 발생했습니다.");
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
