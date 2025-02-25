// src/pages/payment/Fail.jsx
import { useSearchParams } from "react-router-dom";
import "../../assets/css/payment/Fail.css";

export function FailPage() {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  return (
    <div className="fail-wrapper fail-w-100">
      <div className="fail-flex-column fail-align-center fail-max-w-540 fail-w-100">
        <img
          src="https://static.toss.im/lotties/error-spot-apng.png"
          width="120"
          height="120"
          alt="결제 실패"
        />
        <h2 className="fail-title">결제를 실패했어요</h2>
        <div className="fail-response-section fail-w-100">
          <div className="fail-flex fail-justify-between">
            <span className="fail-response-label">code</span>
            <span className="fail-response-text">{errorCode}</span>
          </div>
          <div className="fail-flex fail-justify-between">
            <span className="fail-response-label">message</span>
            <span className="fail-response-text">{errorMessage}</span>
          </div>
        </div>
        <div className="fail-button-group fail-w-100">
          <a
            className="fail-link fail-btn"
            href="https://developers.tosspayments.com/sandbox"
            target="_blank"
            rel="noreferrer noopener"
          >
            다시 테스트하기
          </a>
          <div className="fail-flex" style={{ gap: "16px" }}>
            <a
              className="fail-link fail-btn fail-w-100"
              href="https://docs.tosspayments.com/reference/error-codes"
              target="_blank"
              rel="noreferrer noopener"
            >
              에러코드 문서보기
            </a>
            <a
              className="fail-link fail-btn fail-w-100"
              href="https://techchat.tosspayments.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              실시간 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
