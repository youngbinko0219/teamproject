import React from "react";
import "./style/UserRating.css";

const UserRating = ({ rating }) => {
  return (
    <div className="user-rating">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "filled-star" : "empty-star"}>
          ★
        </span>
      ))}
    </div>
  );
};

export default UserRating;
