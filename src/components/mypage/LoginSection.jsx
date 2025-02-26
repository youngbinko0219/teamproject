// src/components/mypage/LoginSection.jsx
import { useEffect, useState } from "react";
import axios from "axios"; // axios import
import useUserStore from "../../hooks/useUserStore"; // zustand에서 userInfo 가져오기
import "../../assets/css/mypage/LoginSection.css";
import { Link } from "react-router-dom";

const LoginSection = () => {
  const { user_id } = useUserStore(); // Zustand에서 user_id 가져오기
  const [userInfo, setUserInfo] = useState(null); // API에서 가져올 userInfo 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  useEffect(() => {
    if (!user_id) {
      setLoading(false); // user_id가 없으면 로딩 종료
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${user_id}`
        );
        setUserInfo(response.data); // API에서 받아온 userInfo를 상태에 저장
      } catch (error) {
        console.error("회원 정보 불러오기 오류:", error);
        setUserInfo(null); // 오류가 발생하면 userInfo를 null로 설정
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchUserInfo(); // 컴포넌트가 마운트될 때 API 호출
  }, [user_id]); // user_id가 변경될 때마다 실행

  // 로딩 중일 때 표시할 메시지
  if (loading) {
    return <p>회원 정보를 불러오는 중...</p>;
  }

  return (
    <div className="mypage-login-section">
      <h2 className="mypage-login-title">회원 정보</h2>
      <div className="mypage-login-content">
        {userInfo ? (
          <>
            <p>이름: {userInfo.user_name}</p> {/* API에서 가져온 이름 출력 */}
            <p>성별: {userInfo.user_gender}</p> {/* API에서 가져온 성별 출력 */}
            <p>가입일: {userInfo.created_at}</p>{" "}
            {/* API에서 가져온 가입일 출력 */}
          </>
        ) : (
          <p>회원 정보가 없습니다.</p>
        )}
      </div>
      <div className="mypage-login-button-container">
        <Link to="/mypage/edit" className="mypage-edit-button" style={{
                        textDecoration: "none",
                      }}>
          계정 관리
        </Link>
      </div>
    </div>
  );
};

export default LoginSection;
