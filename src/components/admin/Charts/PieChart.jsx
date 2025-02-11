import { Pie } from "react-chartjs-2";
// import "../../assets/css/admin/PieChart.css";

const PieChart = () => {
  const data = {
    labels: ["재고 있음", "재고 부족"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
