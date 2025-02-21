import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import axios from "axios"; // axios import
import "../../assets/css/auth/LoginButton.css";

// Axios의 기본 헤더에 Authorization 토큰 설정
const setAxiosToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const LoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  useEffect(() => {
    // 로그인 성공 후 서버에서 토큰을 헤더에 포함해서 반환했다고 가정
    axios
      .get("http://localhost:8080/oauth2/user", {
        withCredentials: true, // 쿠키와 함께 전송될 수 있도록 설정
      })
      .then((response) => {
        // 응답 헤더에서 Authorization 토큰을 추출
        const token = response.headers["authorization"]; // "Bearer <token>" 형태로 응답

        if (token) {
          // 로컬스토리지에 토큰 저장 (토큰 앞의 "Bearer " 제외)
          const cleanToken = token.replace("Bearer ", "");
          localStorage.setItem("token", cleanToken);

          // Axios의 기본 헤더에 토큰 설정
          setAxiosToken(cleanToken);

          console.log(
            "토큰이 로컬 스토리지와 Axios 헤더에 저장되었습니다:",
            cleanToken
          );
        } else {
          console.error("토큰을 받지 못했습니다.");
        }
      })
      .catch((error) => {
        console.error("로그인 처리 중 오류가 발생했습니다:", error);
      });
  }, []);

  return (
    <div className="login-button-container">
      <button
        className="login-button google-button"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={20} />
        Sign in with Google
      </button>

      <button className="login-button naver-button" onClick={handleNaverLogin}>
        <SiNaver size={20} />
        네이버 아이디로 로그인
      </button>
    </div>
  );
};

export default LoginButton;
