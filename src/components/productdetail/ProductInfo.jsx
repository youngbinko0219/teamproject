import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/productdetail/ProductInfo.css";
import ReviewSummarySimple from "./ReviewSummarySimple";
import RentalPeriodSelector from "./RentalPeriodSelector";
import QuantitySelector from "./QuantitySelector";
import RentalDatePicker from "./RentalDatePicker";
import WishButton from "./WishButton";
import useProductStore from "../../hooks/useProductStore";
import useUserStore from "../../hooks/useUserStore";
import { addCartItem } from "../../services/CartService";

// 날짜 포맷팅 함수 (예: YYYY-MM-DD)
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ProductInfo = () => {
  const navigate = useNavigate();
  const { product_id: paramProductId } = useParams();
  const {
    product_id,
    setProductId,
    rentalPeriod,
    rentalDate,
    setRentalPeriod,
    setRentalDate,
    quantity,
    setQuantity,
    proceedToCheckout,
  } = useProductStore();
  const { user_id } = useUserStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) URL 파라미터로 전달된 product_id를 스토어에 저장
  useEffect(() => {
    if (paramProductId) {
      setProductId(paramProductId);
    }
  }, [paramProductId, setProductId]);

  // 2) API 호출용 ID 결정
  const effectiveProductId = paramProductId || product_id;

  // 3) 상품 정보 불러오기
  useEffect(() => {
    if (!effectiveProductId) {
      console.error("🚨 product_id가 없습니다! API 요청을 중단합니다.");
      setError("상품 ID가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/view/${effectiveProductId}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("상품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [effectiveProductId]);

  // 4) 로딩 및 에러 처리
  if (loading) {
    return <div className="product-info">상품 정보를 불러오는 중...</div>;
  }
  if (error) {
    return <div className="product-info error-message">{error}</div>;
  }
  if (!product) {
    return <div className="product-info">상품 정보를 찾을 수 없습니다.</div>;
  }

  // 5) 가격 계산
  const rentalDays = parseInt(rentalPeriod.replace("일", ""), 10) || 30;
  const updatedPrice = product?.price ? product.price * (rentalDays / 30) : 0;
  const isAvailable = (product?.stock ?? 0) > 0;

  // 6) 만료일 계산 (대여 시작일 + 대여 기간)
  let endDate = null;
  if (rentalDate) {
    endDate = new Date(rentalDate);
    endDate.setDate(endDate.getDate() + rentalDays);
  }

  // 7) 장바구니 담기
  const handleAddToCart = () => {
    const itemData = {
      productId: effectiveProductId,
      rentalPeriod,
      rentalDate,
      quantity,
    };

    addCartItem(itemData)
      .then((response) => {
        console.log("아이템이 장바구니에 추가되었습니다:", response.data);
        navigate(`/cart`);
      })
      .catch((error) => {
        console.error("장바구니에 아이템 추가 중 오류 발생:", error);
      });
  };

  return (
    <div className="product-info">
      <h1 className="product-name-detail">
        {product?.product_name || "상품 이름 없음"}
      </h1>
      <p className="product-price-detail">
        {Number(updatedPrice).toLocaleString()}원~
      </p>

      <div className="product-review">
        <ReviewSummarySimple averageRating={0} totalReviews={0} />
        <p
          className={`product-availability ${
            isAvailable ? "available" : "unavailable"
          }`}
        >
          {isAvailable ? "대여 가능" : "대여 불가"}
        </p>
      </div>

      <p className="product-description">
        {product?.description || "상품 설명 없음"}
      </p>

      <hr className="divider" />

      {/* 대여 기간 */}
      <div className="rental-section">
        <h3 className="section-title">대여 기간</h3>
        <RentalPeriodSelector
          selectedPeriod={rentalPeriod}
          onSelect={setRentalPeriod}
        />
      </div>

      {/* 대여 시작 (달력 아이콘 클릭 시 날짜 선택) */}
      <div className="rental-date-section">
        <h3 className="section-title">
          대여 시작일
          <span className="calendar-icon-wrapper">
            <RentalDatePicker
              selectedDate={rentalDate}
              onSelect={setRentalDate}
            />
          </span>
        </h3>

        {/* 날짜를 선택한 경우만, 숨겨진 칸(rental-summary)을 보여줌 */}
        {rentalDate && (
          <div className="rental-summary">
            <p>대여 시작일: {formatDate(rentalDate)}</p>
            <p>만료일자: {endDate ? formatDate(endDate) : ""}</p>
          </div>
        )}
      </div>

      {/* 구매/장바구니 버튼 */}
      <div className="purchase-buttons">
        <QuantitySelector />

        <button className="add-to-cart" onClick={handleAddToCart}>
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
        <WishButton
          productId={effectiveProductId}
          productName={product?.product_name || "상품"}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
