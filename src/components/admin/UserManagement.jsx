import { useEffect, useState } from "react";
import "../../assets/css/admin/UserManagement.css";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users");
        setUsers(response.data); // API로 받은 사용자 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []); // 빈 배열을 두 번째 인자로 전달해 최초 렌더링 시 한 번만 호출

  const handleSuspend = async (userId) => {
    try {
      await axios.post(`/admin/users/${userId}/suspend`);
      alert("사용자가 정지되었습니다.");
      // 상태 업데이트 후 다시 사용자 목록을 불러오기
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error suspending user:", error);
      alert("사용자 정지에 실패했습니다.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}/delete`);
      alert("사용자가 삭제되었습니다.");
      // 상태 업데이트 후 다시 사용자 목록을 불러오기
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
          {/* users 데이터를 매핑하여 테이블 행을 동적으로 생성 */}
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
