import { useEffect, useState } from "react";
import "../../assets/css/admin/UserManagement.css";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock 데이터 및 설정
const mock = new MockAdapter(axios);

// 초기 사용자 데이터
let mockUsers = [
  { id: 1, name: "홍길동", email: "hong@example.com", status: "활성" },
  { id: 2, name: "김철수", email: "kim@example.com", status: "활성" },
  { id: 3, name: "이영희", email: "lee@example.com", status: "정지" },
];

// GET 요청에 대한 Mock 처리 (회원 목록 조회)
mock.onGet("/admin/users").reply(200, mockUsers);

// POST 요청에 대한 Mock 처리 (회원 정지)
mock.onPost(/\/admin\/users\/\d+\/suspend/).reply((config) => {
  const userId = parseInt(
    config.url.match(/\/admin\/users\/(\d+)\/suspend/)[1]
  );
  mockUsers = mockUsers.map((user) =>
    user.id === userId ? { ...user, status: "정지" } : user
  );
  return [200, { message: "사용자가 정지되었습니다." }];
});

// DELETE 요청에 대한 Mock 처리 (회원 삭제)
mock.onDelete(/\/admin\/users\/\d+\/delete/).reply((config) => {
  const userId = parseInt(config.url.match(/\/admin\/users\/(\d+)\/delete/)[1]);
  mockUsers = mockUsers.filter((user) => user.id !== userId);
  return [200, { message: "사용자가 삭제되었습니다." }];
});

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // 회원 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // 회원 정지 처리
  const handleSuspend = async (userId) => {
    try {
      await axios.post(`/admin/users/${userId}/suspend`);
      alert("사용자가 정지되었습니다.");
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error suspending user:", error);
      alert("사용자 정지에 실패했습니다.");
    }
  };

  // 회원 삭제 처리
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}/delete`);
      alert("사용자가 삭제되었습니다.");
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("사용자 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="user-management">
      <h2>회원 관리</h2>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>상태</th>
            <th>정지</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleSuspend(user.id)}>정지</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
