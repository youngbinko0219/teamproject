import { useState } from "react";
import RememberMeCheckbox from "./RememberMeCheckbox";
import PasswordToggle from "./PasswordToggle";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, rememberMe });
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      {/* 아이디 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          아이디
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디를 입력하세요."
          className="form-control"
        />
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="mb-3 position-relative">
        <label htmlFor="password" className="form-label">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          className="form-control pe-5" /* pe-5: 눈 표시 공간 확보 */
        />
        <PasswordToggle targetId="password" />
      </div>

      {/* 로그인 상태 유지 & 비밀번호 찾기 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <RememberMeCheckbox onChange={(checked) => setRememberMe(checked)} />
        <a
          href="/forgot-password"
          className="text-decoration-none text-primary"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          아이디/비밀번호 찾기
        </a>
      </div>

      {/* 기본 로그인 버튼 */}
      <button type="submit" className="btn btn-danger w-100">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
