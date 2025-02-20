import { useEffect, useState } from "react";
import Countdown from "react-countdown"; // npm install react-countdown
import { FaStar } from "react-icons/fa"; // npm install react-icons
import "../../assets/css/main/TodayProducts.css";

const TodayProducts = () => {
  const [todayProducts, setTodayProducts] = useState([]);

  // 컴포넌트 마운트 시 더미 데이터 설정
  useEffect(() => {
    const fetchTodayProducts = async () => {
      const dummyTodayProducts = [
        {
          id: 1,
          name: "오늘의 유모차",
          price: 115000,
          image: "/assets/images/today-stroller.jpg",
          discount: 20,
        },
        {
          id: 2,
          name: "오늘의 아기 침대",
          price: 145000,
          image: "/assets/images/today-crib.jpg",
          discount: 15,
        },
        {
          id: 3,
          name: "오늘의 기저귀",
          price: 85000,
          image: "/assets/images/today-diapers.jpg",
          discount: 30,
        },
        {
          id: 4,
          name: "오늘의 아기 의자",
          price: 105000,
          image: "/assets/images/today-baby-chair.jpg",
          discount: 10,
        },
      ];
      setTodayProducts(dummyTodayProducts);
    };

    fetchTodayProducts();
  }, []);

  // 카운트다운 종료 시점: 내일 0시
  const now = new Date();
  const tomorrowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // 다음 날
    0, // 0시
    0,
    0,
    0
  );

  // 카운트다운 완료 시 표시할 컴포넌트
  const Completionist = () => <span className="completed">세일 종료</span>;

  // 카운트다운 렌더러
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {days}일 {hours}시간 {minutes}분 {seconds}초
        </span>
      );
    }
  };

  return (
    <div className="today-products-container">
      {/* 상단 헤더: 타이틀 + 카운트다운 */}
      <div className="today-products-header">
        <h2>오늘의 상품</h2>
        <div className="countdown-timer">
          <Countdown date={tomorrowMidnight} renderer={renderer} />
        </div>
      </div>

      {/* 제품 목록 */}
      <div className="today-products-list">
        {todayProducts.map((product) => (
          <div className="today-product-card" key={product.id}>
            {/* 할인율 뱃지 */}
            <div className="discount-badge">-{product.discount}%</div>

            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>

            {/* 별점 (하드코딩 예시) */}
            <div className="rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p className="price">{product.price.toLocaleString()}원</p>
            <button className="add-to-cart">장바구니 담기</button>
          </div>
        ))}
      </div>

      {/* 오늘의의 상품 보기 버튼 */}
      <button className="view-all-products">오늘의 상품 보기</button>
    </div>
  );
};

export default TodayProducts;
