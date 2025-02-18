import "../../assets/css/payment/PaymentConfirmation.css";

const PaymentConfirmation = ({ paymentInfo, onConfirm }) => {
  if (!paymentInfo) return null;

  return (
    <div className="payment-confirmation">
      <h3 className="confirmation-title">결제 확인</h3>

      {paymentInfo.paymentMethod === "bankTransfer" ? (
        <p className="confirmation-info">
          통장 번호: {paymentInfo.bankAccount}
        </p>
      ) : (
        <>
          <p className="confirmation-info">
            카드 번호: {paymentInfo.cardNumber}
          </p>
          <p className="confirmation-info">만료일: {paymentInfo.expiry}</p>
          <p className="confirmation-info">CVC: {paymentInfo.cvc}</p>
        </>
      )}

      <p className="confirmation-info">결제 금액: {paymentInfo.amount}원</p>
      <button onClick={onConfirm} className="confirm-button">
        결제 완료
      </button>
    </div>
  );
};

export default PaymentConfirmation;
