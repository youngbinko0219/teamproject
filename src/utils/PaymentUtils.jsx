// src/utils/paymentUtils.jsx

/**
 * formatCurrency: 숫자를 통화 형식(원화)으로 변환합니다.
 * 예: 1000 -> "₩1,000"
 */
export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  });
};

/**
 * validatePaymentInfo: 결제 정보의 유효성을 검사합니다.
 * paymentInfo 객체는 { cardNumber, expiry, cvc, amount }를 포함해야 합니다.
 * - cardNumber: 13자리 이상 19자리 이하의 숫자 문자열
 * - expiry: "MM/YY" 형식 (월은 01~12)
 * - cvc: 3자리 또는 4자리 숫자 문자열
 * - amount: 양의 숫자
 */
export const validatePaymentInfo = (paymentInfo) => {
  if (
    !paymentInfo ||
    !paymentInfo.cardNumber ||
    !paymentInfo.expiry ||
    !paymentInfo.cvc ||
    paymentInfo.amount === undefined
  ) {
    return false;
  }

  const { cardNumber, expiry, cvc, amount } = paymentInfo;
  const numericAmount = parseFloat(amount);

  const cardNumberValid = /^[0-9]{13,19}$/.test(cardNumber);
  const expiryValid = /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry);
  const cvcValid = /^[0-9]{3,4}$/.test(cvc);
  const amountValid = !isNaN(numericAmount) && numericAmount > 0;

  return cardNumberValid && expiryValid && cvcValid && amountValid;
};

/**
 * generateOrderId: 현재 타임스탬프와 4자리의 랜덤 숫자를 조합하여 주문 ID를 생성합니다.
 * 예: "ORD-1631549234567-1234"
 */
export const generateOrderId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${timestamp}-${randomNum}`;
};
