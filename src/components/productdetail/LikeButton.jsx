import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 
import "../../assets/css/productdetail/LikeButton.css";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button className="like-button" onClick={() => setLiked(!liked)}>
      {liked ? <FaHeart className="liked" /> : <FaRegHeart className="not-liked" />}
    </button>
  );
};

export default LikeButton;
