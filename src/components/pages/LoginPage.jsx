import LoginForm from "../auth/LoginForm";
import LoginButton from "../auth/LoginButton";
import logo from "../../assets/logo.png"; // 로고 이미지 경로 확인

const LoginPage = () => {
  const handleLogin = (credentials) => {
    console.log("로그인 정보:", credentials);
    // TODO: 로그인 API 요청 추가
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
      style={{ width: "100%", height: "100vh" }}
    >
      <div
        className="bg-white p-4 rounded-4 shadow w-100"
        style={{ maxWidth: "500px" }}
      >
        {/* 로고 */}
        <div className="d-flex justify-content-center mb-4">
          <img
            src={logo}
            alt="Babyloop Logo"
            className="h-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
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
