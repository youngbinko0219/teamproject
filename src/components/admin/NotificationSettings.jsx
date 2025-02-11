// import "../../assets/css/admin/NotificationSettings.css";

const NotificationSettings = () => {
  return (
    <div className="notification-settings">
      <h2>알림 설정</h2>
      <div className="settings">
        <label>
          <input type="checkbox" /> 재고 부족 알림
        </label>
        <label>
          <input type="checkbox" /> 매출 리포트 알림
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;
