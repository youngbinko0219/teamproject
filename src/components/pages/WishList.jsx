import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/WishListStyle.css";
import Sidebar from "../pages/Sidebar";
import userStore from "../../zustand/useUserStore.jsx";

const WishList = () => {
  const user_id = userStore((state) => state.user_id);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishList = async () => {
      if (!user_id) {
        setLoading(false);
        return;
      }

      try {
        // 로컬 스토리지에서 JWT 토큰 가져오기
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/wishlist/${user_id}`
        );
        const { message, data } = response.data;

        if (message === "success" && Array.isArray(data)) {
          setWishlist(data); // DB에서 가져온 위시리스트 데이터 저장
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
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <Sidebar />
      <div className="wishlist-content">
        <h1 className="wishlist-title">
          {user_id ? `${user_id}의 위시리스트` : "위시리스트"}
        </h1>
        {wishlist.length > 0 ? (
          <ul className="wishlist-items">
            {wishlist.map((item) => (
              <li className="wishlist-item" key={item.wish_id}>
                <Link to={`/product/${item.product_id}`}>
                  {item.product_name || "상품"}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>위시리스트가 비어 있습니다.</p>
        )}
      </div>
    </>
  );
};

export default WishList;
