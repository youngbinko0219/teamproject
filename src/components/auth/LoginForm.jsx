import { useState } from "react";
import RememberMeCheckbox from "./RememberMeCheckbox";
import PasswordToggle from "./PasswordToggle";
import { Link } from "react-router-dom";
import "../../assets/css/auth/LoginForm.css";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, rememberMe });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">아이디</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디를 입력하세요."
        />
      </div>

      <div className="form-group" style={{ position: "relative" }}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          style={{ paddingRight: "40px" }}
        />
        <PasswordToggle targetId="password" />
      </div>

      <div
        className="form-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RememberMeCheckbox onChange={(checked) => setRememberMe(checked)} />
        <div>
          <Link to="/forgotid" className="form-link">
            아이디
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link to="/forgotpw" className="form-link">
            비밀번호 찾기
          </Link>
        </div>
      </div>

      <button type="submit" className="submit-button">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
