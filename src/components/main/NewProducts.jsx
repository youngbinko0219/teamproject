import { useEffect, useState } from "react";
import ProductSlider from "./ProductSlider";
import "../../assets/css/main/NewProducts.css";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      const dummyNewProducts = [
        {
          id: 1,
          name: "신상품 유모차",
          price: 120000,
          image: "/assets/images/new-stroller.jpg",
        },
        {
          id: 2,
          name: "신상품 아기 침대",
          price: 140000,
          image: "/assets/images/new-crib.jpg",
        },
        {
          id: 3,
          name: "신상품 기저귀",
          price: 80000,
          image: "/assets/images/new-diapers.jpg",
        },
        {
          id: 4,
          name: "신상품 아기 의자",
          price: 100000,
          image: "/assets/images/new-baby-chair.jpg",
        },
      ];
      setNewProducts(dummyNewProducts);
    };

    fetchNewProducts();
  }, []);

  return (
    <div className="new-products-section">
      <ProductSlider products={newProducts} />
    </div>
  );
};

export default NewProducts;
