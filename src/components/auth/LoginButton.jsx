import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";

const LoginButton = () => {
  return (
    <div className="mb-3">
      {/* Google 로그인 버튼 */}
      <button
        className="btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2 w-100 mb-3"
        onClick={() => console.log("Google 로그인")}
      >
        <FcGoogle size={20} />
        Sign in with Google
      </button>

      {/* 네이버 로그인 버튼 */}
      <button
        className="btn btn-success d-flex justify-content-center align-items-center gap-2 w-100"
        onClick={() => console.log("네이버 로그인")}
      >
        <SiNaver size={20} />
        네이버 아이디로 로그인
      </button>
    </div>
  );
};

export default LoginButton;
