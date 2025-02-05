import React from "react";
import "./style/RatingStars.css";

const RatingStars = ({ rating }) => {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "filled-star" : "empty-star"}>
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
