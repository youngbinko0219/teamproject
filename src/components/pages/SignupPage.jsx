import SignupForm from "../auth/SignupForm";
import logo from "../../assets/logo.png";
import axios from "axios";

const SignupPage = () => {
  // 회원가입 데이터 처리 함수
  const handleSignup = async (userData) => {
    try {
      const response = await axios.post(
        "http://192.168.0.16:8080/api/signup",
        userData
      );
      console.log("회원가입 성공:", response.data);
      alert("회원가입이 완료되었습니다!");

      window.location.href = "/login";
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
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
        {/* 로고 영역 */}
        <div className="d-flex justify-content-center mb-4">
          <img
            src={logo}
            alt="Babyloop Logo"
            className="h-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* 회원가입 폼 */}
        <SignupForm onSubmit={handleSignup} />

        {/* 로그인 페이지 링크 */}
        <div className="text-center mt-3 text-sm">
          이미 계정이 있으신가요?{" "}
          <a
            href="/login"
            className="text-primary font-weight-bold text-decoration-none"
          >
            로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
