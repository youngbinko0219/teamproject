import { useState } from "react";
import axios from "axios";
import "../style/ReverseStyle.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import userStore from "../../zustand/useUserStore.jsx";


const Reverse = () => {
  const navigate = useNavigate();
  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    userId: "",
    rentalItem: "",
    phone: "",
    address: "",
    memo: "",
  });

  const [message, setMessage] = useState(null);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5173/auth/reverse",
        formData
      );
      setMessage({ type: "success", text: "상품 회수 신청이 완료되었습니다!" });
      setFormData({
        userId: "",
        rentalItem: "",
        phone: "",
        address: "",
        memo: "",
      }); // 입력값 초기화
    } catch (error) {
      console.error("상품 회수 신청 오류:", error);
      setMessage({
        type: "error",
        text: "상품 회수 신청에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  // 폼 초기화 핸들러
  const handleClear = () => {
    setFormData({
      userId: "",
      rentalItem: "",
      phone: "",
      address: "",
      memo: "",
    });
    setMessage(null);
  };

  return (
    <div className="reverse-page">
      <Sidebar />
      <div className="reverse-container">
        <h2>상품 회수 서비스</h2>
        {message && <p className={`message ${message.type}`}>{message.text}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="아이디"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rentalItem"
            placeholder="대여한 상품"
            value={formData.rentalItem}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="주소"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <textarea
            name="memo"
            placeholder="메모"
            value={formData.memo}
            onChange={handleChange}
          />

          <div className="button-container">
              <button type="submit" className="submit-button">
                신청
              </button>
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              전체 지우기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reverse;
