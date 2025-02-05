import React from "react";
import "./style/RentAvailability.css";

const RentAvailability = ({ available }) => {
  return (
    <span className={`rent-availability ${available ? "available" : "unavailable"}`}>
      {available ? "대여 가능" : "대여 불가능"}
    </span>
  );
};

export default RentAvailability;
