import React from "react";
import "./style/AverageRating.css";

const AverageRating = ({ rating }) => {
  return (
    <div className="average-rating">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "filled-star" : "empty-star"}>
          ★
        </span>
      ))}
    </div>
  );
};

export default AverageRating;
