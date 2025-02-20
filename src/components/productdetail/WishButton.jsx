import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 
import "../../assets/css/productdetail/WishButton.css";

const WishButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button className="wishlist-button" onClick={() => setLiked(!liked)}>
      <span className={liked ? "wished" : "not-wished"}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </span>
    </button>
  );
};

export default WishButton;
