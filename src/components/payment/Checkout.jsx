// src/pages/payment/Checkout.jsx
import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import "../../assets/css/payment/Checkout.css";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPage() {
  const [widgets, setWidgets] = useState(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50000,
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      // 결제 금액 설정
      await widgets.setAmount(amount);

      // 결제 수단과 약관 위젯 렌더링 (selector의 id는 CSS에서 고유하게 사용)
      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#checkout-payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#checkout-agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
    }
    renderPaymentWidgets();
  }, [widgets]);

  const handlePayment = async () => {
    try {
      await widgets?.requestPayment({
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        successUrl: window.location.origin + "/checkout/success",
        failUrl: window.location.origin + "/checkout/fail",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="checkout-wrapper checkout-w-100">
      <div className="checkout-max-w-540 checkout-w-100">
        <div id="checkout-payment-method" className="checkout-w-100" />
        <div id="checkout-agreement" className="checkout-w-100" />
        <div className="checkout-btn-wrapper checkout-w-100">
          <button
            className="checkout-btn checkout-primary checkout-w-100"
            onClick={handlePayment}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
