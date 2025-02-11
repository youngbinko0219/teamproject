import axios from "axios";
import "../Style/WishListStyle.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";

const WishList = () => {
  const { user_id } = useUserStore((state) => ({
    user_id: state.user_id,
    login: state.login,
  }));

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        // 로컬 스토리지에서 JWT 토큰 가져오기
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("로그인이 필요합니다.");
          return;
        }

        // 스프링 부트 API 호출 (위시리스트 가져오기)
        const response = await axios.get("http://localhost:8080/auth/wishlist", {
          headers: { Authorization: `Bearer ${token}` }, // JWT 토큰을 헤더에 추가
        });

        setWishlist(response.data); // 위시리스트 데이터 저장
      } catch (error) {
        console.error("위시리스트 불러오기 오류:", error);
      }
    };

    fetchWishList();
  }, []);

  return (
    <div>
      <h1>{user_id}의 위시리스트</h1>
      <ul>
        {wishlist.map((item, index) => (
          <li key={index}>
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
