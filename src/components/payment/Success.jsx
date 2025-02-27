import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import useUserStore from "../../hooks/useUserStore";
import "../../assets/css/payment/Success.css"; // 고유 스타일 파일
import axios from "axios";

export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate 훅 사용
  const [searchParams] = useSearchParams();
  const user_id = useUserStore((state) => state.user_id);

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const confirmPayment = async () => {
    try {
      // 결제 승인 API 호출
      await axios.post("http://localhost:8080/payments/rentals", {
        paymentKey,
        orderId,
        amount,
      });

      // ✅ 결제 승인 후 강제 이동
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error("결제 승인 중 오류 발생:", error);
    }
  };

  return (
    <div className="success-wrapper success-w-100">
      {!isConfirmed ? (
        <div className="success-flex-column success-align-center success-confirm-loading success-w-100 success-max-w-540">
          <div className="success-flex-column success-align-center">
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
      ) : null}
    </div>
  );
}
