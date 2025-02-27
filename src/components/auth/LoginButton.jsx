import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import axios from "axios";
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
    // POST 요청으로 변경: 로그인 성공 후 서버에서 토큰을 헤더에 포함해서 반환했다고 가정
    const token = localStorage.getItem("accessToken");
axios.post(
  "http://localhost:8080/oauth2/user",
  {}, // 요청 본문이 비어있는 경우
  {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
.then((response) => {
  // 처리 로직
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
