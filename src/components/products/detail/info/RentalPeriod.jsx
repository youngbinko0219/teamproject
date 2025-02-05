import React, { useState } from "react";
import "./style/RentalPeriod.css"; // 스타일 적용

const RentalPeriod = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(30); // 선택된 대여 기간 (초기값: 30일)

  return (
    <div className="rental-period-container">
      <span className="rental-label">대여 기간</span>
      <div className="rental-buttons">
        {[30, 60, 90].map((days) => (
          <button
            key={days}
            className={selectedPeriod === days ? "rental-button selected" : "rental-button"}
            onClick={() => setSelectedPeriod(days)}
          >
            {days}일
          </button>
        ))}
      </div>
    </div>
  );
};

export default RentalPeriod;
