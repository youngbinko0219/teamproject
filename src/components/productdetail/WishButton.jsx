// src/components/productdetail/WishButton.jsx
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import userStore from "../../hooks/useUserStore";
import { addWishItem, removeWishItem } from "../../services/WishListService";
import "../../assets/css/productdetail/WishButton.css";

const WishButton = ({ productId, productName }) => {
  const user_id = userStore((state) => state.user_id);
  const [liked, setLiked] = useState(false);

  const handleToggleWish = () => {
    if (!user_id) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (liked) {
      // 위시 상태인 경우, 위시리스트에서 제거
      removeWishItem(user_id, productId)
        .then((response) => {
          console.log("위시리스트에서 제거되었습니다:", response.data);
          setLiked(false);
        })
        .catch((error) => {
          console.error("위시리스트 제거 오류:", error);
        });
    } else {
      // 위시 상태가 아닌 경우, 위시리스트에 추가
      const wishData = {
        userId: user_id,
        productId,
        productName,
      };
      addWishItem(wishData)
        .then((response) => {
          console.log("위시리스트에 추가되었습니다:", response.data);
          setLiked(true);
        })
        .catch((error) => {
          console.error("위시리스트 추가 오류:", error);
        });
    }
  };

  return (
    <button className="wishlist-button" onClick={handleToggleWish}>
      <span className={liked ? "wished" : "not-wished"}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </span>
    </button>
  );
};

export default WishButton;
