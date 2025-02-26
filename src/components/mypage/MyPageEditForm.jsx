// src/components/mypage/MyPageEditForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/mypage/MyPageEditForm.css";
import useUserStore from "../../hooks/useUserStore";

function MyPageEditForm() {
  const { userInfo, setUserInfo } = useUserStore(); // userInfo를 가져오고 setUserInfo로 업데이트
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [userPw, setUserPw] = useState(""); // 비밀번호 필드
  const [newPw, setNewPw] = useState(""); // 새로운 비밀번호 필드
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/user1")
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setUserInfo(data); // API에서 받은 데이터를 상태에 저장
        setPhone(data.phone || "");
        setPostalCode(data.user_add1 || ""); // user_add1에 우편번호
        setAddress(data.user_add2 || ""); // user_add2에 주소
        setDetailAddress(data.user_add3 || ""); // user_add3에 상세주소
        setSuccessMessage("회원 정보를 성공적으로 불러왔습니다.");
      })
      .catch((err) => {
        console.error("회원 정보 불러오기 오류:", err);
        setError("회원 정보를 불러오는데 실패했습니다.");
      });
  }, [setUserInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("http://localhost:8080/user/user1", {
        user_id: userInfo?.user_id, // 수정 시 필요한 정보만 보냄
        phone,
        user_add1: postalCode,
        user_add2: address,
        user_add3: detailAddress,
        user_pw: userPw, // 기존 비밀번호
        newPw, // 새로운 비밀번호
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
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" value={userInfo?.user_id} readOnly />
        </div>

        <div className="mypage-edit__form-group">
          <label htmlFor="userName">사용자 이름</label>
          <input type="text" id="userName" value={userInfo?.user_name} readOnly />
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
