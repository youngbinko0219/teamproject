import { useEffect, useState } from "react";
import "../../assets/css/admin/StockManagement.css";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock 데이터 설정
const mock = new MockAdapter(axios);

// 가짜 재고 데이터
const mockStockData = [
  { id: 1, productName: "유모차", stock: 50 },
  { id: 2, productName: "카시트", stock: 20 },
  { id: 3, productName: "아기침대", stock: 5 },
];

// API Mock 설정
mock.onGet("/admin/stock").reply(200, mockStockData);
mock.onPost(/\/admin\/stock\/\d+\/set-notification/).reply(200, {
  message: "알림 설정 완료",
});

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
  }, []);

  // 알림 설정 버튼 클릭 처리 함수
  const handleSetNotification = async (productId) => {
    try {
      const response = await axios.post(
        `/admin/stock/${productId}/set-notification`
      );
      alert(response.data.message); // "알림 설정 완료" 메시지 출력
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
