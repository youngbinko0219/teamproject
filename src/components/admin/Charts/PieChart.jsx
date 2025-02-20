import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// 차트 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

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
