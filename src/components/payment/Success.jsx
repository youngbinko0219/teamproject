import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore";
import "../../assets/css/payment/Success.css"; // 고유 스타일 파일

export function SuccessPage() {
  // 결제 완료 여부
  const [isConfirmed, setIsConfirmed] = useState(false);
  // 영수증 확인 링크 (백엔드에서 따로 받지 않고, 우리가 직접 구성)
  const [receiptUrl, setReceiptUrl] = useState("");
  // URL 쿼리 파라미터
  const [searchParams] = useSearchParams();

  // zustand store에서 user_id 가져오기
  const user_id = useUserStore((state) => state.user_id);

  // 쿼리 파라미터에서 결제 관련 정보 추출
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  // 쿼리 파라미터에서 end 값 추출 (없으면 기본값 30)
  const endParam = searchParams.get("end") || "30";

  // 결제 날짜 (yyyy. MM. dd)
  const paymentDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 결제 승인 후, 영수증을 보기 위한 링크
  // (백엔드가 /payments/{user_id}/ok?end=... 에서 영수증을 반환한다고 가정)
  const receiptLink = `http://localhost:8080/payments/${user_id}/ok?end=${endParam}`;

  // 결제 승인 요청 (axios 사용)
  // 1) POST /payments/rentals 로 결제 승인
  // 2) 성공 시 PUT /payments/{user_id}/rentals/point 로 포인트 적립
  // 3) 모든 과정 성공 시 isConfirmed=true & receiptUrl=receiptLink
  const confirmPayment = async () => {
    try {
      // (1) 결제 승인
      const paymentResponse = await axios.post(
        "http://localhost:8080/payments/rentals",
        {
          paymentKey,
          orderId,
          amount,
          // user_id, // 필요하다면 추가
        }
      );

      // 결제 승인 성공 여부 확인
      if (
        paymentResponse.status === 200 &&
        paymentResponse.data.message === "success"
      ) {
        console.log("결제 승인 성공:", paymentResponse.data);

        // (2) 포인트 적립
        // 여기서는 예시로 고정값을 넣었지만,
        // 실제 환경에서는 필요한 정보를 동적으로 받아서 전송하세요.
        const pointResponse = await axios.put(
          `http://localhost:8080/payments/${user_id}/point`,
          {
            user_addpoints: 150,
            user_depoints: 0,
            created_at: paymentDate, // 예: "2024-12-01" 형태도 가능
            payment_method: "상품 주문",
          }
        );

        if (
          pointResponse.status === 200 &&
          pointResponse.data.message === "success"
        ) {
          console.log("포인트 적립 성공:", pointResponse.data);

          // (3) 결제 완료 처리 & 영수증 URL 설정
          setIsConfirmed(true);
          setReceiptUrl(receiptLink); // 영수증 보기 링크
        } else {
          console.error("포인트 적립 실패:", pointResponse);
        }
      } else {
        console.error("결제 승인 실패:", paymentResponse);
      }
    } catch (error) {
      console.error("결제 승인 중 오류 발생:", error);
    }
  };

  return (
    <div className="success-wrapper success-w-100">
      {isConfirmed ? (
        // 결제 완료 화면
        <div
          className="success-flex-column success-align-center success-confirm-success success-w-100 success-max-w-540"
          style={{ display: "flex" }}
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
              {/* 결제 완료 후 '영수증 보기' 링크로 변경 */}
              <a
                className="success-link success-btn success-w-100"
                href={receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                영수증 보기
              </a>
            </div>
          </div>
        </div>
      ) : (
        // 결제 승인 전 화면
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
