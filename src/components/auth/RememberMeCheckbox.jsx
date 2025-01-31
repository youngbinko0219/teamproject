import { useState } from "react";

const RememberMeCheckbox = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="form-check d-flex align-items-center gap-2">
      <input
        type="checkbox"
        id="rememberMe"
        checked={checked}
        onChange={handleChange}
        className="form-check-input"
      />
      <label htmlFor="rememberMe" className="form-check-label">
        로그인 상태 유지
      </label>
    </div>
  );
};

export default RememberMeCheckbox;
