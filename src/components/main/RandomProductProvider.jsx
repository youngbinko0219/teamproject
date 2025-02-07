import { useState, useEffect } from "react";
import AllProductsGrid from "./AllProductsGrid";
import "../../assets/css/main/RandomProductProvider.css";

const RandomProductProvider = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const dummyProducts = [
        {
          id: 1,
          name: "랜덤 유모차",
          price: 110000,
          image: "/assets/images/random-stroller.jpg",
        },
        {
          id: 2,
          name: "랜덤 아기 침대",
          price: 135000,
          image: "/assets/images/random-crib.jpg",
        },
        {
          id: 3,
          name: "랜덤 기저귀",
          price: 75000,
          image: "/assets/images/random-diapers.jpg",
        },
        {
          id: 4,
          name: "랜덤 아기 의자",
          price: 98000,
          image: "/assets/images/random-baby-chair.jpg",
        },
      ];
      setRandomProducts(shuffleArray(dummyProducts));
    };

    fetchProducts();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="random-products-container">
      <h2>랜덤 상품</h2>
      <AllProductsGrid products={randomProducts} />
    </div>
  );
};

export default RandomProductProvider;
