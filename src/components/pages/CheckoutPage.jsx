// src/pages/payment/CheckoutPage.jsx
import { useState } from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import PaymentConfirmation from "../../components/payment/PaymentConfirmation";
import { generateOrderId } from "../../utils/PaymentUtils";
import "../../assets/css/pages/CheckoutPage.css";

const CheckoutPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handlePaymentSubmit = (data) => {
    // 주문 ID를 생성하여 paymentData에 추가합니다.
    const orderId = generateOrderId();
    setPaymentData({ ...data, orderId });
  };

  const handleConfirmPayment = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="checkout-page">
      <h2 className="page-title">결제하기</h2>
      <div className="checkout-content">
        {!paymentData ? (
          <PaymentForm onSubmit={handlePaymentSubmit} />
        ) : (
          <PaymentConfirmation
            paymentInfo={paymentData}
            onConfirm={handleConfirmPayment}
          />
        )}
      </div>
      {isConfirmed && (
        <p className="confirmation-message">결제가 완료되었습니다!</p>
      )}
    </div>
  );
};

export default CheckoutPage;
