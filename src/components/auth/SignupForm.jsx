import { useState, useRef, useEffect } from "react";
import AddressSearch from "./AddressSearch";
import BirthDatePicker from "./DatePicker";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwStrength, setPwStrength] = useState("");

  // Refs for focusing on inputs
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addrRef = useRef(null);

  // 아이디 유효성 검사 (6-20자리, 영어, 숫자)
  useEffect(() => {
    const id = formData.user_id;
    if (id.length > 0) {
      const idRegex = /^[A-Za-z0-9]{6,20}$/;
      if (!idRegex.test(id)) {
        setIdError(
          "아이디는 6-20자리 내 영어 대소문자, 숫자로만 입력할 수 있습니다."
        );
      } else {
        setIdError("");
      }
    } else {
      setIdError("");
    }
  }, [formData.user_id]);

  // 비밀번호 유효성 검사 및 강도 표시
  useEffect(() => {
    const password = formData.user_pw;
    const isLengthValid = password.length >= 8 && password.length <= 16;
    const isVarietyValid =
      /[A-Za-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);

    if (password.length > 0) {
      if (!isLengthValid) {
        setPwError("비밀번호 보안 수준이 낮습니다. 8-16자릿수를 맞춰주세요");
      } else if (!isVarietyValid) {
        setPwError(
          "비밀번호 보안 수준이 낮습니다. 영어 대소문자/ 숫자/ 특수문자를 모두 포함시켜주세요"
        );
      } else {
        setPwError("");
      }

      // 강도 표시: 두 조건 모두 만족하면 안전, 하나만 만족하면 보통, 둘 다 아니면 취약
      let strengthCount = 0;
      if (isLengthValid) strengthCount++;
      if (isVarietyValid) strengthCount++;
      if (strengthCount === 2) {
        setPwStrength("안전");
      } else if (strengthCount === 1) {
        setPwStrength("보통");
      } else {
        setPwStrength("취약");
      }
    } else {
      setPwError("");
      setPwStrength("");
    }
  }, [formData.user_pw]);

  const handleAddressComplete = (data) => {
    setFormData({
      ...formData,
      user_addr1: data.zonecode,
      user_addr2: data.address,
    });
  };

  const handleCheckDuplicateId = async () => {
    // 필수값 검사: user_id가 비어 있으면 안됨
    if (!formData.user_id || formData.user_id.trim() === "") {
      toast.error("아이디를 입력해 주세요.");
      idRef.current.focus();
      return;
    }
    if (idError) {
      toast.error(idError);
      idRef.current.focus();
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/auth/checkid", {
        params: { user_id: formData.user_id },
      });

      if (response.data.message === "error") {
        toast.error("이미 사용 중인 아이디입니다.");
      } else if (response.data.message === "success") {
        toast.success("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 검사 오류:", error);
      toast.error("중복 검사 중 오류가 발생했습니다.");
    }
  };

  const handleSendVerificationEmail = async () => {
    // 필수값 검사: user_email이 비어 있으면 안됨
    if (!formData.user_email || formData.user_email.trim() === "") {
      toast.error("이메일을 입력해 주세요.");
      emailRef.current.focus();
      return;
    }
    if (!validateEmail(formData.user_email)) {
      toast.error("유효한 이메일을 입력해 주세요.");
      emailRef.current.focus();
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/auth/email/send", {
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
    if (!enteredCode || enteredCode.trim() === "") {
      setVerificationMessage("인증번호를 입력해 주세요.");
      return;
    }
    if (storedCode === enteredCode) {
      setVerificationMessage("인증번호가 일치합니다.");
      setIsVerificationComplete(true);
    } else {
      setVerificationMessage("인증번호가 일치하지 않습니다.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // * 표시가 된 필수 데이터들이 null 혹은 빈 값이 아닌지 확인
    if (!formData.user_id || formData.user_id.trim() === "") {
      toast.error("아이디를 입력해 주세요.");
      idRef.current.focus();
      return;
    }
    if (idError) {
      toast.error(idError);
      idRef.current.focus();
      return;
    }
    if (!formData.user_pw || formData.user_pw.trim() === "") {
      toast.error("비밀번호를 입력해 주세요.");
      pwRef.current.focus();
      return;
    }
    if (pwError) {
      toast.error(pwError);
      pwRef.current.focus();
      return;
    }
    if (!formData.user_name || formData.user_name.trim() === "") {
      toast.error("이름을 입력해 주세요.");
      nameRef.current.focus();
      return;
    }
    if (!formData.user_email || formData.user_email.trim() === "") {
      toast.error("이메일을 입력해 주세요.");
      emailRef.current.focus();
      return;
    }
    if (!validateEmail(formData.user_email)) {
      toast.error("이메일 형식이 올바르지 않습니다.");
      emailRef.current.focus();
      return;
    }
    if (!formData.user_phone || formData.user_phone.trim() === "") {
      toast.error("전화번호를 입력해 주세요.");
      phoneRef.current.focus();
      return;
    }
    if (!formData.user_addr1 || !formData.user_addr2) {
      toast.error("주소를 입력해 주세요.");
      addrRef.current.focus();
      return;
    }
    if (!isVerificationComplete) {
      toast.error("이메일 인증을 완료해 주세요.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <label>* 아이디</label>
        <div className="input-group id-input-group">
          <input
            type="text"
            ref={idRef}
            value={formData.user_id}
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
        {idError && <div className="error-message">{idError}</div>}
      </div>

      <div className="form-group">
        <label>* 비밀번호</label>
        <div className="input-with-error">
          {pwError && <div className="error-message">{pwError}</div>}
          <input
            type="password"
            ref={pwRef}
            value={formData.user_pw}
            onChange={(e) =>
              setFormData({ ...formData, user_pw: e.target.value })
            }
            required
          />
        </div>
        {pwStrength && (
          <div
            className="password-strength"
            style={{
              color:
                pwStrength === "안전"
                  ? "green"
                  : pwStrength === "보통"
                  ? "orange"
                  : "red",
            }}
          >
            {pwStrength}
          </div>
        )}
      </div>

      <div className="form-group">
        <label>* 이름</label>
        <input
          type="text"
          ref={nameRef}
          value={formData.user_name}
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
            ref={emailRef}
            value={formData.user_email}
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
          ref={phoneRef}
          value={formData.user_phone}
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
          ref={addrRef}
          value={formData.user_addr3}
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
