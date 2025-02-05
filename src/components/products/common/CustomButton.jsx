import React from "react";
import "./style/CustomButton.css"; // 스타일 적용

const CustomButton = ({ label, onClick, type }) => {
  return (
    <button className={`custom-button ${type}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
