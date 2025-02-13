// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../../assets/css/admin/SalesReport.css";

// // 카테고리 구조 정의
// const CATEGORIES = {
//   아기가구: ["바운서", "아기 체육관", "아기 침대", "범퍼 침대"],
//   놀이용품: [
//     "쏘서/점퍼루",
//     "보행기/러닝홈",
//     "트램폴린/미끄럼틀",
//     "승용완구",
//     "장난감/백일상",
//   ],
//   이동용품: ["유모차/웨건", "카시트", "아기띠"],
//   유아식사: ["식탁의자", "유축기/소독기"],
//   "위생&건강": ["기저귀 갈이대", "유아욕조", "스팀청소기"],
// };

// const SalesReport = () => {
//   const [reportData, setReportData] = useState({
//     totalSales: 0,
//     categoryData: {},
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 백엔드 API 호출
//         const response = await axios.get("/admin/products");

//         // 데이터 가공
//         let total = 0;
//         const categoryStats = {};

//         response.data.forEach((product) => {
//           // 총 매출 계산
//           total += product.price * product.quantity;

//           // 카테고리별 통계
//           const mainCategory = Object.keys(CATEGORIES).find((key) =>
//             CATEGORIES[key].includes(product.subCategory)
//           );

//           if (mainCategory) {
//             categoryStats[mainCategory] = categoryStats[mainCategory] || {
//               total: 0,
//               subCategories: {},
//             };

//             categoryStats[mainCategory].total +=
//               product.price * product.quantity;
//             categoryStats[mainCategory].subCategories[product.subCategory] =
//               (categoryStats[mainCategory].subCategories[product.subCategory] ||
//                 0) + product.quantity;
//           }
//         });

//         setReportData({
//           totalSales: total,
//           categoryData: categoryStats,
//         });
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="loading">데이터 불러오는 중...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="sales-report">
//       <h2>판매 리포트</h2>

//       <div className="total-sales">
//         <h3>총 매출: {reportData.totalSales.toLocaleString()}원</h3>
//       </div>

//       <div className="category-breakdown">
//         <h3>카테고리별 판매 현황</h3>

//         {Object.entries(reportData.categoryData).map(([mainCat, data]) => (
//           <div key={mainCat} className="category-section">
//             <h4>
//               {mainCat} (총 {data.total.toLocaleString()}원)
//             </h4>

//             <table className="subcategory-table">
//               <thead>
//                 <tr>
//                   <th>소분류</th>
//                   <th>판매량</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(data.subCategories).map(
//                   ([subCat, quantity]) => (
//                     <tr key={subCat}>
//                       <td>{subCat}</td>
//                       <td>{quantity.toLocaleString()}개</td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SalesReport;

import { useState, useEffect } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "../../assets/css/admin/SalesReport.css";

// 모의 어댑터 생성 및 설정
const mock = new MockAdapter(axios);

// 모의 데이터: 각 상품은 price, quantity, subCategory 필드를 포함합니다.
// 여기서 quantity는 총수량에서 남은 재고를 뺀, 판매된 수량을 의미합니다.
const mockProducts = [
  { id: 1, price: 10000, quantity: 5, subCategory: "아기 침대" },
  { id: 2, price: 15000, quantity: 3, subCategory: "아기 체육관" },
  { id: 3, price: 20000, quantity: 2, subCategory: "카시트" },
  { id: 4, price: 5000, quantity: 10, subCategory: "바운서" },
  { id: 5, price: 8000, quantity: 8, subCategory: "장난감/백일상" },
];

// /admin/products GET 요청에 대한 모의 응답 설정
mock.onGet("/admin/products").reply(200, mockProducts);

// 카테고리 구조 정의
const CATEGORIES = {
  아기가구: ["바운서", "아기 체육관", "아기 침대", "범퍼 침대"],
  놀이용품: [
    "쏘서/점퍼루",
    "보행기/러닝홈",
    "트램폴린/미끄럼틀",
    "승용완구",
    "장난감/백일상",
  ],
  이동용품: ["유모차/웨건", "카시트", "아기띠"],
  유아식사: ["식탁의자", "유축기/소독기"],
  "위생&건강": ["기저귀 갈이대", "유아욕조", "스팀청소기"],
};

const SalesReport = () => {
  const [reportData, setReportData] = useState({
    totalSales: 0,
    categoryData: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 백엔드 API 호출 (모의 데이터가 응답됨)
        const response = await axios.get("/admin/products");

        // 데이터 가공
        let total = 0;
        const categoryStats = {};

        response.data.forEach((product) => {
          // 총 매출 계산 (판매된 수량(quantity)을 사용)
          total += product.price * product.quantity;

          // 카테고리별 통계
          const mainCategory = Object.keys(CATEGORIES).find((key) =>
            CATEGORIES[key].includes(product.subCategory)
          );

          if (mainCategory) {
            categoryStats[mainCategory] = categoryStats[mainCategory] || {
              total: 0,
              subCategories: {},
            };

            categoryStats[mainCategory].total +=
              product.price * product.quantity;
            categoryStats[mainCategory].subCategories[product.subCategory] =
              (categoryStats[mainCategory].subCategories[product.subCategory] ||
                0) + product.quantity;
          }
        });

        setReportData({
          totalSales: total,
          categoryData: categoryStats,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">데이터 불러오는 중...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="sales-report">
      <h2>판매 리포트</h2>

      <div className="total-sales">
        <h3>총 매출: {reportData.totalSales.toLocaleString()}원</h3>
      </div>

      <div className="category-breakdown">
        <h3>카테고리별 판매 현황</h3>

        {Object.entries(reportData.categoryData).map(([mainCat, data]) => (
          <div key={mainCat} className="category-section">
            <h4>
              {mainCat} (총 {data.total.toLocaleString()}원)
            </h4>

            <table className="subcategory-table">
              <thead>
                <tr>
                  <th>소분류</th>
                  <th>판매량</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.subCategories).map(
                  ([subCat, quantity]) => (
                    <tr key={subCat}>
                      <td>{subCat}</td>
                      <td>{quantity.toLocaleString()}개</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesReport;
