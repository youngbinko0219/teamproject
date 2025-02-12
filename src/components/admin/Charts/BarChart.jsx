import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 차트 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["상품 1", "상품 2", "상품 3"],
    datasets: [
      {
        label: "판매량",
        data: [12, 19, 3],
        backgroundColor: ["#007bff", "#28a745", "#dc3545"],
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
