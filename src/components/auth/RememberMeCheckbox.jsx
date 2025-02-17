import { useState } from "react";
import "../../assets/css/auth/RememberMeCheckbox.css";

const RememberMeCheckbox = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="remember-me-checkbox">
      <input
        type="checkbox"
        id="rememberMe"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor="rememberMe">로그인 상태 유지</label>
    </div>
  );
};

export default RememberMeCheckbox;
