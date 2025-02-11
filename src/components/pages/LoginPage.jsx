import LoginForm from "../auth/LoginForm";
import LoginButton from "../auth/LoginButton";
import logo from "../assets/images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import userStore from "../zustand/useUserStore.jsx";

const LoginPage = () => {

  const handleLogin = async (credentials) => {
    
    //store 불러오기
    const { login } = userStore((state) => ({
      user_id: state.user_id,
      login: state.login,
      logout: state.logout,
    }));

    try {
      // 1. 스프링 부트 API 호출
      const response = await axios.post("http://localhost:8080/auth/login", {
        user_id: credentials.username,
        user_pw: credentials.password,
      });

      // 2. 응답 처리
      const { status, message, accessToken } = response.data; // 응답에서 message와 accessToken 추출

      if (status === "success") {
        console.log("로그인 성공");
        
      // Zustand Store 상태 업데이트
      login(credentials.username); // userStore에 user_id 업데이트

        // 3. JWT 토큰 저장
        localStorage.setItem("accessToken", accessToken);

        // 4. 메인 페이지로 리다이렉트
        window.location.href = "/";
      } else if (status === "fail") {
        console.log("로그인 실패: " + message);
        alert(message || "아이디와 비밀번호를 확인해 주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.response) {
        // 서버에서 에러 응답이 온 경우
        alert(`로그인 실패: ${error.response.data.message}`);
      } else {
        // 네트워크 오류 등
        alert("로그인 실패! 서버 연결 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-direction-column"
      style={{ width: "100%", height: "100vh" }}
    >
      <div
        className="bg-white p-4 rounded-4 shadow w-100"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        {/* 로고 */}
        <div className="d-flex justify-content-center mb-4">
          <Link to="/">
            <img
              src={logo}
              alt="Babyloop Logo"
              className="h-auto"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </Link>
        </div>

        {/* 로그인 폼 */}
        <LoginForm onSubmit={handleLogin} />

        {/* 소셜 로그인 버튼 (Google & 네이버) */}
        <div className="mt-3">
          <LoginButton />
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center mt-3 text-sm">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-primary font-weight-bold">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
