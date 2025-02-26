// src/components/mypage/RentalHistory.jsx
// import MyPageLayout from "./MyPageLayout";
import { useEffect, useState } from "react";
import useUserStore from "../../hooks/useUserStore";  // zustand에서 user_id 가져오기
import axios from "axios";  // axios 임포트
import "../../assets/css/mypage/RentalHistory.css";

const RentalHistory = () => {
  const { user_id } = useUserStore();  // user_id를 zustand에서 가져오기
  const [orders, setOrders] = useState([]);  // 대여 내역 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);  // 에러 상태

  useEffect(() => {
    if (!user_id) {
      setLoading(false);  // user_id가 없으면 로딩 종료
      return;
    }

    const fetchRentalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/user/${user_id}/rentals`);
        setOrders(response.data);  // axios는 response.data에 데이터를 반환
      } catch (error) {
        console.error("Error fetching rental history:", error);
        setError("대여 내역을 불러오는 데 오류가 발생했습니다.");  // 에러 메시지 설정
      } finally {
        setLoading(false);  // 로딩 종료
      }
    };

    fetchRentalHistory();  // 대여 내역 API 호출
  }, [user_id]);  // user_id가 변경될 때마다 호출

  if (loading) {
    return <p>대여 내역을 불러오는 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;  // 에러가 발생하면 메시지 표시
  }

  return (
    <div className="mypage-rental-history">
      <h2 className="mypage-section-title">대여 내역 조회</h2>
      <div className="mypage-rental-list">
        {orders.length === 0 ? (
          <p>대여 내역이 없습니다.</p>
        ) : (
          orders.map((order, index) => (
            <div className="mypage-rental-item" key={index}>
              <div className="mypage-rental-thumbnail">
                {/* 이미지가 있으면 썸네일로 표시 */}
                {order.images && order.images.length > 0 ? (
                  <img
                    src={order.images[0]} // 이미지 URL (배열에서 첫 번째 이미지 사용)
                    alt={order.product_name}
                    className="mypage-rental-image"
                  />
                ) : (
                  <div className="mypage-rental-image-placeholder">이미지 없음</div>
                )}
              </div>
              <div className="mypage-rental-text">
                <span className="mypage-rental-title">{order.product_name}</span>
                <span className="mypage-rental-description">{order.status}</span>
                <span className="mypage-rental-date">
                  {order.rental_end} - 대여 종료 날짜
                </span>
                <span className="mypage-rental-order-date">
                  {order.created_at} - 주문일
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RentalHistory;
