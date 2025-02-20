import { useState } from "react";
import "../../assets/css/admin/NotificationSettings.css";
import axios from "axios";

const NotificationSettings = () => {
  // 매출 리포트 알림 설정 상태만 관리
  const [salesReportAlert, setSalesReportAlert] = useState(false);

  // 체크박스 상태 변경 핸들러
  const handleSalesReportAlertChange = (event) => {
    setSalesReportAlert(event.target.checked);
  };

  // 설정 저장 API 호출
  const saveNotificationSettings = async () => {
    try {
      // 매출 리포트 알림 설정만 전송
      const response = await axios.post("/admin/notification-settings", {
        salesReportAlert,
      });
      if (response.status === 200) {
        alert("알림 설정이 저장되었습니다.");
      }
    } catch (error) {
      console.error("알림 설정 저장 오류:", error);
      alert("알림 설정 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="notification-settings">
      <h2>알림 설정</h2>
      <div className="settings">
        <label>
          <input
            type="checkbox"
            checked={salesReportAlert}
            onChange={handleSalesReportAlertChange}
          />
          매출 리포트 알림
        </label>
      </div>
      <button onClick={saveNotificationSettings}>설정 저장</button>
    </div>
  );
};

export default NotificationSettings;
