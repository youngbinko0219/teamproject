// src/components/payment/PaymentForm.jsx
import { useState } from "react";
import "../../assets/css/payment/PaymentForm.css";
import { validatePaymentInfo } from "../../utils/PaymentUtils"; // 유틸리티 함수 임포트

const PaymentForm = ({ onSubmit }) => {
  // 결제 수단 선택: "portone" (카드 결제)와 "bankTransfer" (통장입금)
  const [paymentMethod, setPaymentMethod] = useState("portone");

  // 포트원(카드 결제) 관련 상태
  const [cardGroup1, setCardGroup1] = useState("");
  const [cardGroup2, setCardGroup2] = useState("");
  const [cardGroup3, setCardGroup3] = useState("");
  const [cardGroup4, setCardGroup4] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  // 통장입금 관련 상태
  const [bankAccount, setBankAccount] = useState("");

  // 결제 금액
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let paymentData = { paymentMethod, amount: Number(amount) };

    if (paymentMethod === "portone") {
      const cardNumber = `${cardGroup1}${cardGroup2}${cardGroup3}${cardGroup4}`;
      const expiry = `${expiryMonth}/${expiryYear}`;
      paymentData = { ...paymentData, cardNumber, expiry, cvc };
      // 카드 결제의 경우 결제 정보 유효성 검사
      if (!validatePaymentInfo(paymentData)) {
        alert("결제 정보가 올바르지 않습니다. 다시 확인해 주세요.");
        return;
      }
    } else if (paymentMethod === "bankTransfer") {
      paymentData = { ...paymentData, bankAccount };
      // 통장입금의 경우, 금액과 통장 번호에 대해 간단한 유효성 검사를 할 수 있습니다.
      if (!bankAccount.trim()) {
        alert("통장 번호를 올바르게 입력해 주세요.");
        return;
      }
      if (Number(amount) <= 0) {
        alert("결제 금액은 양수여야 합니다.");
        return;
      }
    }

    onSubmit(paymentData);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      {/* 결제 수단 선택 */}
      <div className="payment-method-group">
        <label className="payment-method-label">결제 수단</label>
        <div className="payment-method-options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="portone"
              checked={paymentMethod === "portone"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            포트원
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              checked={paymentMethod === "bankTransfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            통장입금
          </label>
        </div>
      </div>

      {/* 포트원(카드 결제) 입력란 */}
      {paymentMethod === "portone" && (
        <>
          <div className="card-number-group">
            <label className="card-number-label">카드 번호</label>
            <div className="card-number-inputs">
              <input
                type="text"
                value={cardGroup1}
                onChange={(e) => setCardGroup1(e.target.value)}
                placeholder="0000"
                maxLength={4}
                required
              />
              <input
                type="password"
                value={cardGroup2}
                onChange={(e) => setCardGroup2(e.target.value)}
                placeholder="****"
                maxLength={4}
                required
              />
              <input
                type="password"
                value={cardGroup3}
                onChange={(e) => setCardGroup3(e.target.value)}
                placeholder="****"
                maxLength={4}
                required
              />
              <input
                type="text"
                value={cardGroup4}
                onChange={(e) => setCardGroup4(e.target.value)}
                placeholder="0000"
                maxLength={4}
                required
              />
            </div>
          </div>
          <div className="expiry-group">
            <label className="expiry-label">만료일</label>
            <div className="expiry-inputs">
              <input
                type="text"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                placeholder="MM"
                maxLength={2}
                required
              />
              <input
                type="text"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                placeholder="YY"
                maxLength={2}
                required
              />
            </div>
          </div>
          <div className="cvc-group">
            <label className="cvc-label">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
              required
            />
          </div>
        </>
      )}

      {/* 통장입금 입력란 */}
      {paymentMethod === "bankTransfer" && (
        <div className="bank-account-group">
          <label className="bank-account-label">통장 번호</label>
          <input
            type="text"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            placeholder="통장 번호를 입력하세요"
            required
          />
        </div>
      )}

      {/* 결제 금액 입력 */}
      <div className="amount-group">
        <label className="amount-label">결제 금액</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="결제 금액"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        결제하기
      </button>
    </form>
  );
};

export default PaymentForm;
