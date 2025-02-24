import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import "../../assets/css/admin/DashboardOverview.css";

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <h2>대시보드 개요</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>인기 상품</h3>
          <BarChart />
        </div>
        <div className="chart">
          <h3>재고 현황</h3>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
