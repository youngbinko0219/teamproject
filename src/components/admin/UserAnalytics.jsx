import "../../assets/css/admin/UserAnalytics.css";

const UserAnalytics = () => {
  return (
    <div className="user-analytics">
      <h2>가입 현황</h2>
      <div className="analytics-data">
        <p>총 가입자: 1,000명</p>
        <p>유입 경로: 검색엔진 50%, 소셜미디어 30%, 기타 20%</p>
      </div>
    </div>
  );
};

export default UserAnalytics;
