import "../../assets/css/payment/PaymentHistory.css";
import { formatCurrency } from "../../utils/PaymentUtils";

const PaymentHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return <p className="no-history">결제 내역이 없습니다.</p>;
  }

  return (
    <div className="payment-history">
      <h3 className="history-title">결제 내역</h3>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item.id} className="history-item">
            <p className="history-info">결제 ID: {item.id}</p>
            <p className="history-info">금액: {formatCurrency(item.amount)}</p>
            <p className="history-info">날짜: {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
