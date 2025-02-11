const ForgotPwPage = () => {
  return (
    <div className="container mt-5">
      <h2>비밀번호 찾기</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            아이디
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          비밀번호 찾기
        </button>
      </form>
    </div>
  );
};

export default ForgotPwPage;
