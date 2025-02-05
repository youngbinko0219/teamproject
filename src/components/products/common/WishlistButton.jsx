import React, { useState } from "react";
import "./style/WishlistButton.css"; // 스타일 적용

const WishlistButton = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <button 
      className={`wishlist-button ${isWishlisted ? "active" : ""}`} 
      onClick={() => setIsWishlisted(!isWishlisted)}
    >
      {isWishlisted ? "♥ 찜 취소" : "♡ 찜"}
    </button>
  );
};

export default WishlistButton;
