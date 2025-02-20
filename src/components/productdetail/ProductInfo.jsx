import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/productdetail/ProductInfo.css";
import ReviewSummarySimple from "./ReviewSummarySimple";
import RentalPeriodSelector from "./RentalPeriodSelector";
import Dropdown from "./Dropdown";
import QuantitySelector from "./QuantitySelector";
import RentalDatePicker from "./RentalDatePicker";
import WishButton from "./WishButton";
import useProductStore from "../../zustand/useProductStore";

const ProductInfo = () => {
  const navigate = useNavigate();
  const {
    product_id, rentalPeriod, selectedOption, rentalDate, quantity,
    setRentalPeriod, setSelectedOption, setRentalDate, setQuantity,
    addToCart, proceedToCheckout
  } = useProductStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ✅ 상품 데이터를 API에서 가져옴 */
  useEffect(() => {
    if (!product_id) {
      console.error("🚨 product_id가 없습니다! API 요청을 중단합니다.");
      setError("상품 ID가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/view/${product_id}`);
        console.log("📦 상품 데이터 응답:", response.data);
        setProduct(response.data);
      } catch (err) {
        console.error("상품 데이터를 불러오는 중 오류 발생:", err);
        setError("상품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  // ✅ 로딩 상태 표시
  if (loading) return <div className="product-info">상품 정보를 불러오는 중...</div>;
  if (error) return <div className="product-info error-message">{error}</div>;
  if (!product) return <div className="product-info">상품 정보를 찾을 수 없습니다.</div>;

  // ✅ 가격 계산 (대여 기간 문자열 → 숫자로 변환 후 계산)
  const rentalDays = parseInt(rentalPeriod.replace("일", ""), 10) || 30; // 🔥 "30일" → 30 숫자로 변환
  const updatedPrice = product?.price ? product.price * (rentalDays / 30) : 0;

  // ✅ 재고 확인 (undefined 방지)
  const isAvailable = (product?.stock ?? 0) > 0;

  return (
    <div className="product-info">
      <h1 className="product-name-detail">{product?.product_name || "상품 이름 없음"}</h1>
      <p className="product-price-detail">{Number(updatedPrice).toLocaleString()}원~</p>

      <div className="product-review">
        <ReviewSummarySimple averageRating={0} totalReviews={0} />
        <p className={`product-availability ${isAvailable ? "available" : "unavailable"}`}>
          {isAvailable ? "대여 가능" : "대여 불가"}
        </p>
      </div>

      <p className="product-description">{product?.description || "상품 설명 없음"}</p>

      <hr className="divider" />

      {/* ✅ 대여 기간 선택 */}
      <div className="rental-section">
        <h3 className="section-title">대여 기간</h3>
        <RentalPeriodSelector selectedPeriod={rentalPeriod} onSelect={setRentalPeriod} />
      </div>

      {/* ✅ 옵션 선택 */}
      <div className="option-section">
        <h3 className="section-title">옵션 선택</h3>
        <Dropdown options={product?.options || []} selected={selectedOption} onSelect={setSelectedOption} />
      </div>

      {/* ✅ 대여 시작일 선택 */}
      <div className="rental-date-section">
        <h3 className="section-title">대여 시작</h3>
        <RentalDatePicker selectedDate={rentalDate} onSelect={setRentalDate} />
      </div>

      {/* ✅ 장바구니 & 즉시 구매 */}
      <div className="purchase-buttons">
        <QuantitySelector />
        <button
          className="add-to-cart"
          onClick={() => {
            addToCart();
            navigate(`/cart`);
          }}
        >
          장바구니
        </button>

        <button
          className="buy-now"
          onClick={() => {
            proceedToCheckout();
            navigate(`/checkout`);
          }}
        >
          바로 대여
        </button>
        <WishButton />
      </div>
    </div>
  );
};

export default ProductInfo;
