// import "../../assets/css/admin/UserManagement.css";

const UserManagement = () => {
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
          {/* 회원 데이터 매핑 */}
          <tr>
            <td>홍길동</td>
            <td>user@example.com</td>
            <td>활성</td>
            <td>
              <button>정지</button>
            </td>
            <td>
              <button>삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
