// src/components/mypage/MyPageEditForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/mypage/MyPageEditForm.css";
import useUserStore from "../../hooks/useUserStore";

function MyPageEditForm() {
  // 변경 전: const { userInfo, setUserInfo } = useUserStore();
  // 변경 후: zustand 스토어에서 개별 상태인 user_id와 user_name을 직접 가져옵니다.
  const { user_id, user_name, setUserInfo } = useUserStore();

  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [userPw, setUserPw] = useState(""); // 현재 비밀번호 필드
  const [newPw, setNewPw] = useState(""); // 새 비밀번호 필드
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!user_id) return; // user_id가 없으면 API 호출하지 않음

    // 변경 전: axios.get("http://localhost:8080/user/{user_id}")
    // 변경 후: 실제 user_id 값을 URL에 포함시켜 API 호출
    axios
      .get(`http://localhost:8080/user/${user_id}`)
      .then((res) => {
        const data = res.data;
        setUserInfo(data); // 스토어에 사용자 정보 업데이트
        setPhone(data.phone || "");
        setPostalCode(data.user_add1 || "");
        setAddress(data.user_add2 || "");
        setDetailAddress(data.user_add3 || "");
        setSuccessMessage("회원 정보를 성공적으로 불러왔습니다.");
      })
      .catch((err) => {
        console.error("회원 정보 불러오기 오류:", err);
        setError("회원 정보를 불러오는데 실패했습니다.");
      });
  }, [user_id, setUserInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 변경 전: axios.put("http://localhost:8080/user/user1", {...})
      // 변경 후: user_id 값을 URL에 동적으로 포함
      const response = await axios.put(`http://localhost:8080/user/${user_id}`, {
        user_id,
        phone,
        user_add1: postalCode,
        user_add2: address,
        user_add3: detailAddress,
        user_pw: userPw,
        newPw,
      });

      if (response.status === 200) {
        alert("정보가 성공적으로 업데이트되었습니다.");
      } else {
        setError("업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("업데이트 오류:", error);
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mypage-edit-account-settings">
      <h1>계정 정보 수정</h1>
      <form className="mypage-edit-account-form" onSubmit={handleSubmit}>
        <div className="mypage-edit__form-group">
          <label>아이디</label>
          {/* 변경 전: <input type="text" ... readOnly /> */}
          {/* 변경 후: 직접 user_id를 표시하는 단순 텍스트로 변경 */}
          <p>{user_id}</p>
        </div>

        <div className="mypage-edit__form-group">
          <label>사용자 이름</label>
          {/* 변경 전: <input type="text" ... readOnly /> */}
          {/* 변경 후: 직접 user_name을 표시하는 단순 텍스트로 변경 */}
          <p>{user_name}</p>
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="userPw">현재 비밀번호</label>
          <input
            type="password"
            id="userPw"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
            required
          />
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="newPw">새 비밀번호</label>
          <input
            type="password"
            id="newPw"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="postalCode">우편번호</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="detailAddress">상세 주소</label>
          <input
            type="text"
            id="detailAddress"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="mypage-edit__button">
          저장
        </button>
      </form>
    </div>
  );
}

export default MyPageEditForm;
// src/components/mypage/MypageEditForm.jsx