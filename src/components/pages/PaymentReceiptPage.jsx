// src/pages/payment/PaymentReceiptPage.jsx
import { useEffect, useState } from "react";
// import QRCode from "qrcode.react";
import axios from "axios";
import "../../assets/css/pages/PaymentReceiptPage.css";
import { formatCurrency } from "../../utils/PaymentUtils";

const PaymentReceiptPage = () => {
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 백엔드 API를 호출하여 주문별 영수증 데이터를 받아옵니다.
  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        // 실제 API 경로에 맞게 수정하세요.
        const response = await axios.get(
          "http://localhost:8080/payment/receipt"
        );
        setReceiptData(response.data);
      } catch (error) {
        console.error("영수증 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceiptData();
  }, []);

  if (loading) {
    return <p className="loading-message">영수증을 불러오는 중...</p>;
  }

  if (!receiptData) {
    return <p className="error-message">영수증 정보를 불러올 수 없습니다.</p>;
  }

  // QR 코드에 인코딩할 데이터: 주문 ID, 구매 내역, 총 결제 금액, 날짜를 JSON 문자열로 변환
  //   const qrData = JSON.stringify({
  //     orderId: receiptData.orderId,
  //     items: receiptData.items,
  //     totalAmount: receiptData.totalAmount,
  //     date: receiptData.date,
  //   });

  return (
    <div className="payment-receipt-page">
      <h2 className="page-title">영수증</h2>
      <div className="receipt-content">
        <p className="instruction">
          아래 QR 코드를 스캔하면 상세 영수증 정보를 확인하실 수 있습니다.
        </p>
        <div className="qr-code">
          {/* <QRCode
            value={qrData}
            size={200}
            bgColor="#ffffff"
            fgColor="#ff7f7f"
            level="H"
          /> */}
        </div>
        <div className="receipt-details">
          <p className="receipt-info">주문 번호: {receiptData.orderId}</p>
          <p className="receipt-info">
            결제 금액: {formatCurrency(receiptData.totalAmount)}
          </p>
          <p className="receipt-info">결제 일시: {receiptData.date}</p>
          <ul className="item-list">
            {receiptData.items.map((item) => (
              <li key={item.id} className="item">
                {item.name} - {formatCurrency(item.price)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptPage;
