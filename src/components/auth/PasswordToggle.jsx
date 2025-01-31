import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordToggle = ({ targetId }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
    const passwordInput = document.getElementById(targetId);
    if (passwordInput) {
      passwordInput.type = visible ? "password" : "text";
    }
  };

  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className="position-absolute"
      style={{
        right: "10px",
        top: "36px",
        backgroundColor: "transparent", // 배경을 투명하게 설정
        border: "none", // 버튼의 기본 테두리 제거
        padding: "0", // 기본 padding 제거 (크기 조정)
        width: "auto", // 크기 자동 설정
        height: "auto", // 크기 자동 설정
      }}
    >
      {visible ? (
        <EyeOff size={20} className="text-muted" />
      ) : (
        <Eye size={20} className="text-muted" />
      )}
    </button>
  );
};

export default PasswordToggle;
