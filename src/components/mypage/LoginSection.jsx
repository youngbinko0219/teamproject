// src/components/mypage/LoginSection.jsx
import { useEffect } from "react";
import { fetchUserInfo } from "../../services/useService";
import useUserStore from "../../hooks/useUserStore";
import "../../assets/css/mypage/LoginSection.css";

const LoginSection = () => {
  const { user_id, userInfo } = useUserStore();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(user_id);
        // 데이터가 배열로 온다면 첫 번째 요소를 저장합니다.
        if (Array.isArray(data) && data.length > 0) {
          setUserInfo(data[0]);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("회원 정보 불러오기 오류:", error);
        setUserInfo(null);
      }
    };

    if (user_id) {
      getUserInfo();
    }
  }, [user_id, setUserInfo]);

  return (
    <div className="mypage-login-section">
      <h2 className="mypage-login-title">회원 정보</h2>
      <div className="mypage-login-content">
        {userInfo ? (
          <>
            <p>이름: {userInfo.user_name}</p>
            <p>성별: {userInfo.user_gender}</p>
            <p>가입일: {userInfo.created_at}</p>
          </>
        ) : (
          <p>회원 정보를 불러오는 중...</p>
        )}
      </div>
      <div className="mypage-login-button-container">
        <button className="mypage-edit-button">계정 관리</button>
      </div>
    </div>
  );
};

export default LoginSection;
