import { useEffect, useState } from "react";
import "../../assets/css/admin/UserManagement.css";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 페이지 번호에 따라 회원 목록을 가져오는 함수
  const fetchUsers = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/users?page=${pageNumber}`
      );
      // 응답 구조: { totalPages, page, totalCount, users }
      setUsers(response.data.users);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // 회원 정지 처리
  const handleSuspend = async (userId) => {
    try {
      await axios.post(`http://localhost:8080/admin/users/${userId}/suspend`);
      alert("사용자가 정지되었습니다.");
      fetchUsers(page);
    } catch (error) {
      console.error("Error suspending user:", error);
      alert("사용자 정지에 실패했습니다.");
    }
  };

  // 회원 삭제 처리
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${userId}/delete`);
      alert("사용자가 삭제되었습니다.");
      fetchUsers(page);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("사용자 삭제에 실패했습니다.");
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchUsers(newPage);
    }
  };

  return (
    <div className="user-management">
      <h2>회원 관리</h2>
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>정지</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>
                  <button onClick={() => handleSuspend(user.user_id)}>
                    정지
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.user_id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">데이터를 불러오는 중입니다...</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
