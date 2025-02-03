import { useState } from "react";
import AddressSearch from "./AddressSearch";
import BirthDatePicker from "./DatePicker";

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
  });

  // 주소 검색 완료 핸들러
  const handleAddressComplete = (data) => {
    setFormData({
      ...formData,
      user_addr1: data.zonecode,
      user_addr2: data.address,
    });
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      {/* 아이디 */}
      <div className="mb-3">
        <label className="form-label">아이디 *</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, user_id: e.target.value })
          }
          required
        />
        <div className="invalid-feedback">아이디를 입력해주세요</div>
      </div>

      {/* 비밀번호 */}
      <div className="mb-3">
        <label className="form-label">비밀번호 *</label>
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
        <label className="form-label">이름 *</label>
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
        <label className="form-label">이메일 *</label>
        <input
          type="email"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, user_email: e.target.value })
          }
          required
        />
      </div>

      {/* 전화번호 */}
      <div className="mb-3">
        <label className="form-label">전화번호</label>
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
        <label className="form-label">주소 *</label>
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
        <label className="form-label">생년월일</label>
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
