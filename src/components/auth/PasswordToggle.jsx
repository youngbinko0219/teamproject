import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../assets/css/auth/PasswordToggle.css";

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
      className="password-toggle-btn"
    >
      {visible ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
};

export default PasswordToggle;
