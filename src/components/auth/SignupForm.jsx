import { useState } from "react";
import AddressSearch from "./AddressSearch";
import BirthDatePicker from "./DatePicker";
import axios from "axios";

const SignupForm = ({ onSubmit }) => {
  // 상태 관리
  const [formData, setFormData] = useState({
    user_id: "",
    user_pw: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    user_addr1: "", // 우편번호
    user_addr2: "", // 주소
    user_addr3: "", // 상세주소
    user_gender: "",
    user_birth: "",
    verificationCode: "", // 인증번호
  });

  const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증 메일 발송 상태
  const [isVerificationComplete, setIsVerificationComplete] = useState(false); // 인증 완료 상태
  const [verificationMessage, setVerificationMessage] = useState(""); // 인증 메시지 상태

  // 주소 검색 완료 핸들러
  const handleAddressComplete = (data) => {
    setFormData({
      ...formData,
      user_addr1: data.zonecode,
      user_addr2: data.address,
    });
  };

  // 아이디 중복 검사 핸들러
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

  // 이메일 인증 메일 발송 핸들러
  const handleSendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/emailSend",
        {
          user_email: formData.user_email,
        }
      );

      if (response.status === 200) {
        const data = response.data; // 응답 데이터 가져오기

        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("code", data.code);
          window.location.href = "/";
        } else {
          alert("이메일 인증에 실패했습니다.");
        }

        setIsVerificationSent(true); // 인증 메일 발송 상태 업데이트
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      alert("이메일 인증 중 오류가 발생했습니다.");
    }
  };

  // 인증번호 확인 핸들러
  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/checkmail",
        {
          email: formData.user_email,
          code: formData.verificationCode,
        }
      );
      if (response.status === 200) {
        setVerificationMessage("인증번호가 일치합니다."); // 인증번호 일치 메시지
        setIsVerificationComplete(true); // 인증 완료 상태 업데이트
      }
    } catch (error) {
      console.error("인증번호 확인 오류:", error);
      setVerificationMessage("인증번호가 일치하지 않습니다."); // 인증번호 불일치 메시지
    }
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerificationComplete) {
      alert("이메일 인증을 완료해 주세요.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      {/* 아이디 */}
      <div className="mb-3">
        <label className="form-label">* 아이디</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, user_id: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCheckDuplicateId}
          >
            중복 검사
          </button>
        </div>
        <div className="invalid-feedback">아이디를 입력해주세요</div>
      </div>

      {/* 비밀번호 */}
      <div className="mb-3">
        <label className="form-label">* 비밀번호</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, user_pw: e.target.value })
          }
          required
        />
      </div>

      {/* 이름 */}
      <div className="mb-3">
        <label className="form-label">* 이름</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, user_name: e.target.value })
          }
          required
        />
      </div>

      {/* 이메일 */}
      <div className="mb-3">
        <label className="form-label">* 이메일</label>
        <div className="input-group">
          <input
            type="email"
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, user_email: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSendVerificationEmail}
            disabled={isVerificationSent}
          >
            {isVerificationSent ? "인증 메일 발송됨" : "인증 메일 발송"}
          </button>
        </div>
      </div>

      {/* 인증번호 입력 필드 (히든 상태) */}
      {isVerificationSent && !isVerificationComplete && (
        <div className="mb-3">
          <label className="form-label">* 인증번호</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="인증번호를 입력하세요"
              onChange={(e) =>
                setFormData({ ...formData, verificationCode: e.target.value })
              }
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleVerifyCode}
            >
              인증번호 확인
            </button>
          </div>
          {verificationMessage && (
            <div className="mt-2 text-danger">{verificationMessage}</div>
          )}
        </div>
      )}

      {/* 전화번호 */}
      <div className="mb-3">
        <label className="form-label">* 전화번호</label>
        <input
          type="tel"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, user_phone: e.target.value })
          }
        />
      </div>

      {/* 주소 검색 */}
      <div className="mb-3">
        <label className="form-label">* 주소</label>
        <AddressSearch onComplete={handleAddressComplete} />

        {/* 우편번호 입력 칸 */}
        <input
          type="text"
          className="form-control mt-2"
          placeholder="우편번호"
          value={formData.user_addr1} // 선택한 우편번호 표시
          readOnly
        />

        {/* 주소 입력 칸 */}
        <input
          type="text"
          className="form-control mt-2"
          placeholder="주소"
          value={formData.user_addr2} // 선택한 주소 표시
          readOnly
        />

        {/* 상세 주소 입력 칸 */}
        <input
          type="text"
          className="form-control mt-2"
          placeholder="상세주소"
          onChange={(e) =>
            setFormData({ ...formData, user_addr3: e.target.value })
          }
        />
      </div>

      {/* 성별 */}
      <div className="mb-3">
        <label className="form-label">성별</label>
        <select
          className="form-select"
          onChange={(e) =>
            setFormData({ ...formData, user_gender: e.target.value })
          }
        >
          <option value="">선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>

      {/* 생년월일 */}
      <div className="mb-4">
        <label className="form-label"></label>
        <BirthDatePicker
          onChange={(date) => setFormData({ ...formData, user_birth: date })}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        회원가입 완료
      </button>
    </form>
  );
};

export default SignupForm;
