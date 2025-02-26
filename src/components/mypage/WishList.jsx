// src/components/mypage/WishList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import userStore from "../../hooks/useUserStore";
import "../../assets/css/mypage/WishList.css";

const WishList = () => {
  const user_id = userStore((state) => state.user_id);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishList = async () => {
      console.log("user_id:", user_id);  // 로그 추가
      if (!user_id) {
        console.log("user_id 없음, 종료"); // 로그 추가
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }
        console.log("토큰:", token); // 로그 추가
        const response = await axios.get(
          `http://localhost:8080/wishlist/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API 응답:", response.data); // 로그 추가
        const { message, data } = response.data;
        if (message === "success" && Array.isArray(data)) {
          setWishlist(data);
        } else {
          setError("위시리스트 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        setError("위시리스트를 불러오는 중 오류가 발생했습니다.");
        console.error("위시리스트 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishList();
  }, [user_id]);

  if (loading) {
    return <p className="wishlist-loading">로딩 중...</p>;
  }
  if (error) {
    return <p className="wishlist-error">{error}</p>;
  }

  return (
    <div className="wishlist-component">
      <h1 className="wishlist-title">
        {user_id ? `${user_id}의 위시리스트` : "위시리스트"}
      </h1>
      {wishlist.length > 0 ? (
        <ul className="wishlist-items">
          {wishlist.map((item) => (
            <li className="wishlist-item" key={item.wishId}>
              <Link to={`/product/${item.productId}`}>
                {item.productName || "상품"}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="wishlist-empty">위시리스트가 비어 있습니다.</p>
      )}
    </div>
  );
};

export default WishList;
