import { useEffect, useState } from "react";
import axios from "axios";
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

const SalesBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchProductData() {
      try {
        // 페이징 처리된 API 호출 (예: page 1, size 10)
        const response = await axios.get(
          "http://localhost:8080/admin/products?page=1&size=10"
        );
        const products = response.data.products;

        // 만약 제품 데이터에 'sales' 필드가 없다면, 'stock' 필드를 임시로 판매량으로 사용합니다.
        // 실제 판매량 데이터가 있다면 (예: product.sales) 해당 필드를 사용하세요.
        const sortedProducts = products.sort(
          (a, b) => (b.sales || b.stock) - (a.sales || a.stock)
        );

        // 상위 5개 상품 추출
        const topProducts = sortedProducts.slice(0, 5);

        // 차트에 사용할 라벨과 데이터 배열 생성
        const labels = topProducts.map((product) => product.product_name);
        const dataValues = topProducts.map(
          (product) => product.sales || product.stock
        );

        const data = {
          labels,
          datasets: [
            {
              label: "판매량",
              data: dataValues,
              backgroundColor: [
                "#007bff",
                "#28a745",
                "#dc3545",
                "#ffc107",
                "#17a2b8",
              ],
            },
          ],
        };
        setChartData(data);
      } catch (error) {
        console.error("Failed to fetch product data for chart:", error);
      }
    }
    fetchProductData();
  }, []);

  if (!chartData) return <div>Loading chart data...</div>;

  return <Bar data={chartData} />;
};

export default SalesBarChart;
