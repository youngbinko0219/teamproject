import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/pages/AdminLoginPage.css";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 하드코딩된 어드민 계정
    if (username === "admin" && password === "aaaa") {
      localStorage.setItem("isAdmin", "true"); // 어드민 로그인 상태 저장
      navigate("/admin/dashboard"); // 어드민 대시보드로 이동
    } else {
      alert("잘못된 아이디 또는 비밀번호입니다.");
      navigate("/"); // 메인 페이지로 이동
    }
  };

  return (
    <div className="admin-login-container">
      <h2>관리자 로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {/* 변경: className="login-button" → className="admin-login-button" */}
        <button type="submit" className="admin-login-button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
