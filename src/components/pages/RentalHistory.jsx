// import { useEffect, useState } from "react";
// import axios from "axios";
// import { format } from "date-fns";
// import "../style/RentalStyle.css";

// const RentalHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5173/auth/rental");
//         console.log(response.data); // 데이터 확인용
//         if (Array.isArray(response.data)) {
//           setOrders(response.data);
//         } else {
//           setOrders([]);
//           setError("데이터 형식이 올바르지 않습니다.");
//         }
//       } catch (err) {
//         setError("데이터를 불러오는 중 오류가 발생했습니다.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <p>로딩 중...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <div className="rental-history-container">
//       <h2 className="text-xl font-bold mb-4">대여 내역 조회</h2>
//       <table className="rental-table">
//         <thead>
//           <tr>
//             <th>주문 ID</th>
//             <th>회원 고유번호</th>
//             <th>총 금액</th>
//             <th>주문 상태</th>
//             <th>대여 종료 날짜</th>
//             <th>주문일</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id || order.memberId}>
//                 <td>{order.id || "-"}</td>
//                 <td>{order.memberId || "-"}</td>
//                 <td>
//                   {order.totalAmount ? order.totalAmount.toLocaleString() : "0"}
//                   원
//                 </td>
//                 <td>{order.status || "-"}</td>
//                 <td>
//                   {order.rentalEndDate
//                     ? format(new Date(order.rentalEndDate), "yyyy-MM-dd")
//                     : "-"}
//                 </td>
//                 <td>
//                   {order.orderDate
//                     ? format(new Date(order.orderDate), "yyyy-MM-dd")
//                     : "-"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">대여 내역이 없습니다.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RentalHistory;

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "../style/RentalStyle.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const RentalHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기
        const response = await axios.get("http://localhost:5173//rental", {
        });
        console.log(response.data); // 데이터 확인
        if (Array.isArray(response.data)) {
          setOrders(response.data); // 데이터 상태 업데이트
        } else {
          setOrders([]);
          setError("데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="rental-history-layout">
      <Sidebar />
      <div className="rental-history-container">
        <h2 className="rental-title">대여 내역 조회</h2>

        <table className="rental-table">
          <thead>
            <tr>
              <th className="align-center">주문 제품</th>
              <th className="align-center">금액</th>
              <th className="align-center">주문 상태</th>
              <th className="align-center">대여 종료 날짜</th>
              <th className="align-center">주문일</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td className="align-center">{order.productName || "-"}</td>
                  <td className="align-right">
                    {order.totalAmount
                      ? order.totalAmount.toLocaleString()
                      : "0"}{" "}
                    원
                  </td>
                  <td className="align-center">{order.status || "-"}</td>
                  <td className="align-center">
                    {order.rentalEndDate
                      ? format(new Date(order.rentalEndDate), "yyyy-MM-dd")
                      : "-"}
                  </td>
                  <td className="align-center">
                    {order.orderDate
                      ? format(new Date(order.orderDate), "yyyy-MM-dd")
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="align-center">
                  대여 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RentalHistory;
