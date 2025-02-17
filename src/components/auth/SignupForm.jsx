import { useState } from "react";
import AddressSearch from "./AddressSearch";
import BirthDatePicker from "./DatePicker";
import axios from "axios";
import "../../assets/css/auth/SignupForm.css";

const SignupForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    user_pw: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    user_addr1: "",
    user_addr2: "",
    user_addr3: "",
    user_gender: "",
    user_birth: "",
    verificationCode: "",
  });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleAddressComplete = (data) => {
    setFormData({
      ...formData,
      user_addr1: data.zonecode,
      user_addr2: data.address,
    });
  };

  const handleCheckDuplicateId = async () => {
    try {
      const response = await axios.get(
        `/api/check-id?userId=${formData.user_id}`
      );
      if (response.data.isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 검사 오류:", error);
      alert("중복 검사 중 오류가 발생했습니다.");
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8080/email/send", {
        user_email: formData.user_email,
      });
      if (response.status === 200) {
        const data = response.data;
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("code", data.code);
        } else {
          alert("이메일 인증에 실패했습니다.");
        }
        setIsVerificationSent(true);
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      alert("이메일 인증 중 오류가 발생했습니다.");
    }
  };

  const handleVerifyCode = () => {
    const storedCode = localStorage.getItem("code");
    const enteredCode = formData.verificationCode;
    if (storedCode === enteredCode) {
      setVerificationMessage("인증번호가 일치합니다.");
      setIsVerificationComplete(true);
    } else {
      setVerificationMessage("인증번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerificationComplete) {
      alert("이메일 인증을 완료해 주세요.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <label>* 아이디</label>
        <div className="input-group">
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, user_id: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="verification-btn"
            onClick={handleCheckDuplicateId}
          >
            중복 검사
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>* 비밀번호</label>
        <input
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, user_pw: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label>* 이름</label>
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, user_name: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label>* 이메일</label>
        <div className="input-group">
          <input
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, user_email: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="verification-btn"
            onClick={handleSendVerificationEmail}
            disabled={isVerificationSent}
          >
            {isVerificationSent ? "인증 메일 발송됨" : "인증 메일 발송"}
          </button>
        </div>
      </div>

      {isVerificationSent && !isVerificationComplete && (
        <div className="form-group">
          <label>* 인증번호</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="인증번호를 입력하세요"
              onChange={(e) =>
                setFormData({ ...formData, verificationCode: e.target.value })
              }
            />
            <button
              type="button"
              className="verification-btn"
              onClick={handleVerifyCode}
            >
              인증번호 확인
            </button>
          </div>
          {verificationMessage && (
            <div className="verification-message">{verificationMessage}</div>
          )}
        </div>
      )}

      <div className="form-group">
        <label>* 전화번호</label>
        <input
          type="tel"
          onChange={(e) =>
            setFormData({ ...formData, user_phone: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>* 주소</label>
        <AddressSearch onComplete={handleAddressComplete} />
        <input
          type="text"
          placeholder="우편번호"
          value={formData.user_addr1}
          readOnly
        />
        <input
          type="text"
          placeholder="주소"
          value={formData.user_addr2}
          readOnly
        />
        <input
          type="text"
          placeholder="상세주소"
          onChange={(e) =>
            setFormData({ ...formData, user_addr3: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>성별</label>
        <select
          onChange={(e) =>
            setFormData({ ...formData, user_gender: e.target.value })
          }
        >
          <option value="">선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>

      <div className="form-group">
        <BirthDatePicker
          onChange={(date) => setFormData({ ...formData, user_birth: date })}
        />
      </div>

      <button type="submit" className="submit-button">
        회원가입 완료
      </button>
    </form>
  );
};

export default SignupForm;
