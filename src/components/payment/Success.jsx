import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore";
import "../../assets/css/payment/Success.css"; // 고유 스타일 파일

export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const user_id = useUserStore((state) => state.user_id); // zustand store에서 user_id 가져오기

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  // 현재 날짜를 결제 날짜로 사용 (한국 형식: yyyy. MM. dd)
  const paymentDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 결제 승인 요청 (axios 사용)
  const confirmPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/payments/rentals",
        {
          paymentKey,
          orderId,
          amount,
          user_id, // user_id 추가
        }
      );

      if (response.status === 200 && response.data.message === "success") {
        setIsConfirmed(true);
      } else {
        console.error("결제 승인 실패", response);
      }
    } catch (error) {
      console.error("결제 승인 중 오류 발생", error);
    }
  };

  return (
    <div className="success-wrapper success-w-100">
      {isConfirmed ? (
        <div
          className="success-flex-column success-align-center success-confirm-success success-w-100 success-max-w-540"
          style={{
            display: "flex",
          }} /* 기본 CSS에서 display: none; 이지만 여기서 override */
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
            alt="결제 완료"
          />
          <h2 className="success-title">결제를 완료했어요</h2>

          <div className="success-response-section success-w-100">
            <div className="success-flex success-justify-between">
              <span className="success-response-label">결제 금액</span>
              <span className="success-response-text">{amount}</span>
            </div>
            <div className="success-flex success-justify-between">
              <span className="success-response-label">주문번호</span>
              <span className="success-response-text">{orderId}</span>
            </div>
            <div className="success-flex success-justify-between">
              <span className="success-response-label">결제 날짜</span>
              <span className="success-response-text">{paymentDate}</span>
            </div>
          </div>

          <div className="success-w-100 success-button-group">
            <div className="success-flex" style={{ gap: "16px" }}>
              <a
                className="success-link success-btn success-w-100"
                href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
                target="_blank"
                rel="noopener noreferrer"
              >
                결제 연동 문서가기
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="success-flex-column success-align-center success-confirm-loading success-w-100 success-max-w-540">
          <div className="success-flex-column success-align-center">
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              width="120"
              height="120"
              alt="로딩"
            />
            <h2 className="success-title success-text-center">
              결제 요청까지 성공했어요.
            </h2>
            <h4 className="success-text-center success-description">
              결제 승인하고 완료해보세요.
            </h4>
          </div>
          <div className="success-w-100">
            <button
              className="success-btn success-primary success-w-100"
              onClick={confirmPayment}
            >
              결제 승인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
