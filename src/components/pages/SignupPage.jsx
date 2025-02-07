import SignupForm from "../auth/SignupForm";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  // 회원가입 데이터 처리 함수
  const handleSignup = async (userData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          },
        }
      );

      if (response.data.message === "success") {
        console.log("회원가입 성공:", response.data);
        alert("회원가입이 완료되었습니다!");
        navigate("/login"); // 성공 시 로그인 페이지로 이동
      } else {
        console.error("회원가입 실패:", response.data);
        alert("회원가입 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light w-100">
      <div
        className="bg-white p-4 rounded-4 shadow mx-auto"
        style={{ maxWidth: "1920px", margin: "0 auto" }}
      >
        {/* 로고 영역 */}
        <div className="d-flex justify-content-center mb-4">
          <Link to="/">
            <img
              src={logo}
              alt="Babyloop Logo"
              className="h-auto"
              style={{
                maxWidth: "200px",
                height: "auto",
                display: "block",
              }}
            />
          </Link>
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
