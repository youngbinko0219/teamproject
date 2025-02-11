import { useEffect, useState } from "react";
import "../../assets/css/admin/StockManagement.css";
import axios from "axios";

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);

  // 재고 목록을 가져오는 함수
  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        const response = await axios.get("/admin/stock");
        setStockItems(response.data); // API로 받은 재고 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching stock items:", error);
      }
    };
    fetchStockItems();
  }, []); // 빈 배열을 두 번째 인자로 전달해 최초 렌더링 시 한 번만 호출

  // 알림 설정 버튼 클릭 처리 함수
  const handleSetNotification = async (productId) => {
    try {
      await axios.post(`/admin/stock/${productId}/set-notification`);
      alert("알림이 설정되었습니다.");
    } catch (error) {
      console.error("Error setting notification:", error);
      alert("알림 설정에 실패했습니다.");
    }
  };

  return (
    <div className="stock-management">
      <h2>재고 관리</h2>
      <div className="stock-list">
        {/* 재고 데이터 매핑 */}
        {stockItems.map((item) => (
          <div key={item.id} className="stock-item">
            <span>
              {item.productName}: {item.stock}개
            </span>
            <button onClick={() => handleSetNotification(item.id)}>
              알림 설정
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockManagement;
