// src/components/mypage/RentalHistory.jsx
import MyPageLayout from "./MyPageLayout";
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
    // RentalHistory가 독립 페이지로 동작한다면:
    // <MyPageLayout>
    //   <div className="mypage-rental-history"> ... </div>
    // </MyPageLayout>

    // 대시보드 안에 들어가는 부분이라면 MyPageLayout 생략 후 그대로 렌더링
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
  );
};

export default RentalHistory;
