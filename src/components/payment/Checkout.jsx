// src/pages/payment/Checkout.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import "../../assets/css/payment/Checkout.css";
import useUserStore from "../../hooks/useUserStore";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPage() {
  // axios로 결제 데이터를 받아옵니다.
  const { user_id } = useUserStore();
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("user_id:", user_id)

  useEffect(() => {
    async function fetchPaymentData() {
      try {
        const response = await axios.get(`http://localhost:8080/cart/list?userId=${user_id}`);
        setPaymentData(response.data);
      } catch (error) {
        console.error("결제 데이터 로딩 에러:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPaymentData();
  }, []);

  // paymentData가 배열이며 마지막 항목이 요약(summary) 데이터라고 가정합니다.
  const cartSummary =
    Array.isArray(paymentData) && paymentData.length > 0
      ? paymentData[paymentData.length - 1]
      : null;

  // totalCartPrice 값을 결제 금액으로 사용합니다.
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: cartSummary?.totalCartPrice || 50000,
  });

  // cartSummary 값이 변경되면 결제 금액 업데이트
  useEffect(() => {
    if (cartSummary?.totalCartPrice) {
      setAmount({
        currency: "KRW",
        value: cartSummary.totalCartPrice,
      });
    }
  }, [cartSummary]);

  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgetsInstance = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgetsInstance);
    }
    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      // 결제 금액 설정
      await widgets.setAmount(amount);

      // 결제 수단과 약관 위젯 렌더링
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
  }, [widgets, amount]);

  // 실제 상품 데이터: 마지막 summary 데이터를 제외한 나머지 항목
  const validCartItems =
    Array.isArray(paymentData) && paymentData.length > 1
      ? paymentData.slice(0, -1)
      : [];

  // 주문 이름 생성: 상품이 1개면 해당 상품명, 여러 개면 첫 상품명 + "외 x건"
  const orderName =
    validCartItems.length > 0
      ? validCartItems.length === 1
        ? validCartItems[0].productName
        : `${validCartItems[0].productName} 외 ${validCartItems.length - 1}건`
      : "주문 상품";

  const handlePayment = async () => {
    try {
      await widgets?.requestPayment({
        orderId: generateRandomString(),
        orderName: orderName,
        customerName: validCartItems[0]?.userName || "고객",
        customerEmail: validCartItems[0]?.userEmail || "customer@example.com",
        successUrl: window.location.origin + "/checkout/success",
        failUrl: window.location.origin + "/checkout/fail",
      });
    } catch (error) {
      console.error("결제 요청 에러:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
