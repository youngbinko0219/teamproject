// src/components/productdetail/WishButton.jsx
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import userStore from "../../hooks/useUserStore";
import { addWishItem, removeWishItem } from "../../services/WishListService";
import "../../assets/css/productdetail/WishButton.css";

const WishButton = ({ productId, productName }) => {
  const user_id = userStore((state) => state.user_id);
  const [liked, setLiked] = useState(false);

  const handleToggleWish = async () => {
    if (!user_id) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      if (liked) {
        // 위시 상태인 경우, 위시리스트에서 제거
        const response = await removeWishItem(user_id, productId);
        if (response.data.message === "success") {
          setLiked(false);
          toast.success("위시리스트에서 제거되었습니다.");
        } else {
          toast.error("위시 제거에 실패했습니다.");
          console.error("위시 제거 실패:", response.data);
        }
      } else {
        // 위시 상태가 아닌 경우, 위시리스트에 추가
        const wishData = {
          userId: user_id,
          productId,
          productName,
        };
        const response = await addWishItem(wishData);
        if (response.data.message === "success") {
          setLiked(true);
          toast.success("위시리스트에 추가되었습니다.");
        } else {
          toast.error("위시 추가에 실패했습니다.");
          console.error("위시 추가 실패:", response.data);
        }
      }
    } catch (error) {
      toast.error("위시리스트 처리 중 오류가 발생했습니다.");
      console.error("위시리스트 처리 중 오류 발생:", error);
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
