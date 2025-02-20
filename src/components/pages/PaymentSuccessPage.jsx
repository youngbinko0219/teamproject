import { Link } from "react-router-dom";
import "../../assets/css/pages/PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  return (
    <div className="payment-success-page">
      <h2 className="page-title">결제 성공</h2>
      <p className="success-message">
        고객님의 결제가 성공적으로 완료되었습니다.
      </p>
      <p className="success-message">이용해 주셔서 감사합니다!</p>
      <p className="receipt-link">
        <Link to="/payment/receipt" className="text-link">
          영수증 확인하기
        </Link>
      </p>
    </div>
  );
};

export default PaymentSuccessPage;
