import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import "../../assets/css/pages/WishListStyle.css";

const RentalHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/rental");
        console.log(response.data); // 데이터 확인용
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">대여 내역 조회</h2>
        <Table>
          <thead>
            <tr>
              <th>주문 ID</th>
              <th>회원 고유번호</th>
              <th>총 금액</th>
              <th>주문 상태</th>
              <th>대여 종료 날짜</th>
              <th>주문일</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id || order.memberId}>
                <td>{order.id || "-"}</td>
                <td>{order.memberId || "-"}</td>
                <td>{order.totalAmount ? order.totalAmount.toLocaleString() : "0"}원</td>
                <td>{order.status || "-"}</td>
                <td>{order.rentalEndDate ? format(new Date(order.rentalEndDate), "yyyy-MM-dd") : "-"}</td>
                <td>{order.orderDate ? format(new Date(order.orderDate), "yyyy-MM-dd") : "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RentalHistory;
