import { Line } from "react-chartjs-2";
// import "../../assets/css/admin/LineChart.css";

const LineChart = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        label: "판매 추이",
        data: [65, 59, 80, 81, 56],
        borderColor: "#007bff",
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
