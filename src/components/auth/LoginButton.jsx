import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import "../../assets/css/auth/LoginButton.css";

const LoginButton = () => {
  return (
    <div className="login-button-container">
      {/* Google 로그인 버튼 */}
      <button
        className="login-button google-button"
        onClick={() => console.log("Google 로그인")}
      >
        <FcGoogle size={20} />
        Sign in with Google
      </button>

      {/* 네이버 로그인 버튼 */}
      <button
        className="login-button naver-button"
        onClick={() => console.log("네이버 로그인")}
      >
        <SiNaver size={20} />
        네이버 아이디로 로그인
      </button>
    </div>
  );
};

export default LoginButton;
