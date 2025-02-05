import React, { useState } from "react";
import "./style/Dropdown.css"; 

const Dropdown = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="dropdown-container">
      <span className="dropdown-label">{label}</span>
      <select
        className="dropdown-select"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">옵션을 선택해주세요.</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
