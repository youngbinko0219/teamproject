// import MyPageLayout from "./MyPageLayout";
import "../../assets/css/mypage/RentalHistory.css";

const RentalHistory = () => {
  // 임시 데이터 (UI 확인용)
  const orders = [
    {
      productName: "유모차",
      totalAmount: 30000,
      status: "대여 중",
      rentalEndDate: "2024-10-24",
      orderDate: "2024-10-01",
    },
    {
      productName: "카시트",
      totalAmount: 20000,
      status: "반납 완료",
      rentalEndDate: "2024-09-15",
      orderDate: "2024-09-01",
    },
  ];

  return (
    // <MyPageLayout>
    <div className="mypage-rental-history">
      <h2 className="mypage-section-title">대여 내역 조회</h2>
      <div className="mypage-rental-list">
        {orders.map((order, index) => (
          <div className="mypage-rental-item" key={index}>
            <div className="mypage-rental-thumbnail">{/* 썸네일 */}</div>
            <div className="mypage-rental-text">
              <span className="mypage-rental-title">{order.productName}</span>
              <span className="mypage-rental-description">{order.status}</span>
              <span className="mypage-rental-date">{order.rentalEndDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </MyPageLayout>
  );
};

export default RentalHistory;
