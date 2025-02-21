import { useState, useEffect } from "react";
import "../../assets/css/productdetail/ProductInfo.css";
import ReviewSummarySimple from "./ReviewSummarySimple";
import RentalPeriodSelector from "./RentalPeriodSelector";
import Dropdown from "./Dropdown";
import QuantitySelector from "./QuantitySelector";
import RentalDatePicker from "./RentalDatePicker";
import WishButton from "./WishButton";
import { fetchProduct } from "./api";

const ProductInfo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 선택된 옵션 상태 관리
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState("30일");
  const [selectedOption, setSelectedOption] = useState("옵션을 선택해주세요");
  const [selectedRentalDate, setSelectedRentalDate] = useState(null);

  /* 상품 데이터를 API에서 가져옴 */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(productId);
        setProduct(data);
      } catch (err) {
        console.log(err);
        setError("상품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // 로딩 상태 표시
  if (loading)
    return <div className="product-info">상품 정보를 불러오는 중...</div>;
  if (error) return <div className="product-info">{error}</div>;
  if (!product)
    return <div className="product-info">상품 정보를 찾을 수 없습니다.</div>;

  // 리뷰 데이터에서 총 개수와 평균 평점 계산
  const totalReviews = product.reviews?.length || 0;
  const averageRating =
    totalReviews > 0
      ? product.reviews.reduce((acc, cur) => acc + cur.rating, 0) / totalReviews
      : 0;

  // 재고량이 0이면 대여 불가 처리
  const isAvailable = product.stockQuantity > 0;

  return (
    <div className="product-info">
      <h1 className="product-name">{product.name}</h1>
      <p className="product-price">{product.price.toLocaleString()}</p>

      <div className="product-review">
        <ReviewSummarySimple
          averageRating={averageRating}
          totalReviews={totalReviews}
        />
        <p
          className={`product-availability ${
            isAvailable ? "available" : "unavailable"
          }`}
        >
          {isAvailable ? "대여 가능" : "대여 불가"}
        </p>
      </div>

      <p className="product-description">{product.description}</p>

      <hr className="divider" />

      {/* 대여 기간 선택 */}
      <div className="rental-section">
        <h3 className="section-title">대여 기간</h3>
        <RentalPeriodSelector
          selectedPeriod={selectedRentalPeriod}
          onSelect={setSelectedRentalPeriod}
        />
      </div>

      {/* 옵션 선택 */}
      <div className="option-section">
        <h3 className="section-title">옵션 선택</h3>
        <Dropdown
          options={product.options || []}
          selected={selectedOption}
          onSelect={setSelectedOption}
        />
      </div>

      {/* 대여 시작일 선택 */}
      <div className="rental-date-section">
        <h3 className="section-title">대여 시작</h3>
        <RentalDatePicker
          selectedDate={selectedRentalDate}
          onSelect={setSelectedRentalDate}
        />
      </div>

      {/* 장바구니 & 즉시 구매 */}
      <div className="purchase-buttons">
        <QuantitySelector />
        <button className="add-to-cart">장바구니 추가</button>
        <button className="buy-now">바로 대여하기</button>
        <WishButton />
      </div>
    </div>
  );
};

export default ProductInfo;
