import { useEffect, useState } from "react";
import ProductSlider from "./ProductSlider";
import "../../assets/css/main/TodayProducts.css";

const TodayProducts = () => {
  const [todayProducts, setTodayProducts] = useState([]);

  useEffect(() => {
    const fetchTodayProducts = async () => {
      const dummyTodayProducts = [
        {
          id: 1,
          name: "오늘의 유모차",
          price: 115000,
          image: "/assets/images/today-stroller.jpg",
        },
        {
          id: 2,
          name: "오늘의 아기 침대",
          price: 145000,
          image: "/assets/images/today-crib.jpg",
        },
        {
          id: 3,
          name: "오늘의 기저귀",
          price: 85000,
          image: "/assets/images/today-diapers.jpg",
        },
        {
          id: 4,
          name: "오늘의 아기 의자",
          price: 105000,
          image: "/assets/images/today-baby-chair.jpg",
        },
      ];
      setTodayProducts(dummyTodayProducts);
    };

    fetchTodayProducts();
  }, []);

  return (
    <div className="today-products-container">
      <ProductSlider products={todayProducts} />
    </div>
  );
};

export default TodayProducts;
