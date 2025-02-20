import useTermsAgreement from "../../hooks/useTermsAgreement";
import "../../assets/css/auth/TermsAgreementForm.css";

const TermsAgreementForm = ({ onNext }) => {
  const { agreements, agreeAll, handleIndividualChange, handleAgreeAllChange } =
    useTermsAgreement();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 필수 항목: 이용약관과 개인정보 처리방침에 모두 동의했는지 확인
    if (agreements.termsOfService && agreements.privacyPolicy) {
      // agreements를 전달하지 않고 onNext를 호출
      onNext();
    } else {
      alert("이용약관과 개인정보 처리방침에 모두 동의해 주세요.");
    }
  };

  return (
    <div className="terms-form">
      <h1>약관 동의</h1>
      <form onSubmit={handleSubmit}>
        <div className="terms-item">
          <h2>이용약관</h2>
          <p>
            이용약관 내용 예시입니다. 여기에 실제 이용약관의 상세 내용을
            기재합니다. 이 약관은 서비스 이용과 관련한 제반 사항을 규정하며,
            사용자와 서비스 제공자 간의 권리와 의무를 명시합니다.
          </p>
          <label>
            <input
              type="checkbox"
              name="termsOfService"
              checked={agreements.termsOfService}
              onChange={handleIndividualChange}
            />
            동의함
          </label>
        </div>

        <div className="terms-item">
          <h2>개인정보 처리방침</h2>
          <p>
            개인정보 처리방침 내용 예시입니다. 여기에 실제 개인정보 수집 및
            활용, 제3자 제공, 보관 기간 등의 상세 내용을 기재합니다.
          </p>
          <label>
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={agreements.privacyPolicy}
              onChange={handleIndividualChange}
            />
            동의함
          </label>
        </div>

        <div className="terms-item">
          <h2>마케팅 정보 수신 동의 (선택)</h2>
          <p>
            마케팅 정보 수신에 대한 내용 예시입니다. 이벤트, 할인 정보 등 마케팅
            정보를 이메일 또는 SMS로 받으실 수 있습니다.
          </p>
          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={agreements.marketing}
              onChange={handleIndividualChange}
            />
            동의함
          </label>
        </div>

        <div className="agree-all">
          <label>
            <input
              type="checkbox"
              checked={agreeAll}
              onChange={handleAgreeAllChange}
            />
            전체 동의
          </label>
        </div>

        <button type="submit" className="next-button">
          다음
        </button>
      </form>
    </div>
  );
};

export default TermsAgreementForm;
