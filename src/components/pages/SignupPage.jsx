import SignupForm from "../auth/SignupForm";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/pages/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "success") {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        alert("회원가입 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page-container signup-page">
      <div className="auth-card signup-card">
        <div className="auth-logo">
          <Link to="/">
            <img src={logo} alt="Babyloop Logo" />
          </Link>
        </div>
        <SignupForm onSubmit={handleSignup} />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="auth-link">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
