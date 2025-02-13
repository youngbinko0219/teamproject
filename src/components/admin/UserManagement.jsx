import { useEffect, useState } from "react";
import "../../assets/css/admin/UserManagement.css";
import axios from "axios";

import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
let mockUsers = [
  { id: 1, name: "홍길동", email: "hong@example.com", status: "활성" },
  { id: 2, name: "김철수", email: "kim@example.com", status: "활성" },
  { id: 3, name: "이영희", email: "lee@example.com", status: "정지" },
];
mock.onGet("/admin/users").reply(200, mockUsers);
mock.onPost(/\/admin\/users\/\d+\/suspend/).reply((config) => {
  const userId = parseInt(
    config.url.match(/\/admin\/users\/(\d+)\/suspend/)[1]
  );
  mockUsers = mockUsers.map((user) =>
    user.id === userId ? { ...user, status: "정지" } : user
  );
  return [200, { message: "사용자가 정지되었습니다." }];
});
mock.onDelete(/\/admin\/users\/\d+\/delete/).reply((config) => {
  const userId = parseInt(config.url.match(/\/admin\/users\/(\d+)\/delete/)[1]);
  mockUsers = mockUsers.filter((user) => user.id !== userId);
  return [200, { message: "사용자가 삭제되었습니다." }];
});

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // 회원 목록을 가져오는 함수
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
      // 변경 후 최신 회원 목록을 다시 조회
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
      // 변경 후 최신 회원 목록을 다시 조회
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
