import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../../services/CartService";
import useUserStore from "../../hooks/useUserStore";
import "../../assets/css/mypage/CartView.css";

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const navigate = useNavigate();

  // zustand 스토어에서 사용자 정보를 가져옴 (userInfo에 포인트가 포함되어 있다고 가정)
  const userInfo = useUserStore((state) => state.userInfo);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    getCartItems()
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("장바구니 데이터를 불러오는 중 오류 발생:", error);
      });
  };

  const handleAddItem = () => {
    const newItem = {
      productId: 1,
      rentalPeriod: "30일",
      rentalDate: "2025-03-01",
      quantity: 1,
    };

    addCartItem(newItem)
      .then((response) => {
        setCartItems((prevItems) => [...prevItems, response.data]);
      })
      .catch((error) => {
        console.error("아이템 추가 중 오류 발생:", error);
      });
  };

  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    updateCartItem(item.id, { quantity: newQuantity })
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
          )
        );
      })
      .catch((error) => {
        console.error("수량 증가 중 오류 발생:", error);
      });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateCartItem(item.id, { quantity: newQuantity })
        .then(() => {
          setCartItems((prevItems) =>
            prevItems.map((i) =>
              i.id === item.id ? { ...i, quantity: newQuantity } : i
            )
          );
        })
        .catch((error) => {
          console.error("수량 감소 중 오류 발생:", error);
        });
    }
  };

  const handleDeleteItem = (itemId) => {
    deleteCartItem(itemId)
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
      })
      .catch((error) => {
        console.error("아이템 삭제 중 오류 발생:", error);
      });
  };

  const handleClearCart = () => {
    clearCart()
      .then(() => {
        setCartItems([]);
        console.log("장바구니가 비워졌습니다.");
      })
      .catch((error) => {
        console.error("장바구니 비우기 중 오류 발생:", error);
      });
  };

  // 결제 페이지로 이동하는 함수
  const goToCheckout = () => {
    navigate("/checkout");
  };

  // 각 장바구니 아이템에 price 프로퍼티가 있다고 가정합니다.
  // 만약 없다면 기본 가격(예: 10000원)을 사용하도록 처리함.
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 10000) * item.quantity,
    0
  );
  const finalPrice = usePoints
    ? Math.max(totalPrice - pointsToUse, 0)
    : totalPrice;

  return (
    <div className="cart-view">
      <div className="cart-header">
        <h1>장바구니</h1>
        <button className="clear-cart-button" onClick={handleClearCart}>
          장바구니 비우기
        </button>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p>상품 ID: {item.productId}</p>
            <p>대여 기간: {item.rentalPeriod}</p>
            <p>대여 시작일: {item.rentalDate}</p>
            <p className="item-quantity">
              수량: {item.quantity}{" "}
              <button onClick={() => handleDecreaseQuantity(item)}>-</button>
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
            </p>
            <p>가격: {(item.price || 10000) * item.quantity}원</p>
            <button
              className="delete-button"
              onClick={() => handleDeleteItem(item.id)}
            >
              삭제
            </button>
          </div>
        ))
      ) : (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      )}

      {/* 포인트 사용 섹션 */}
      <div className="cart-points-section">
        <p>현재 보유 포인트: {userInfo ? userInfo.points : 0}원</p>
        <label>
          <input
            type="checkbox"
            checked={usePoints}
            onChange={(e) => setUsePoints(e.target.checked)}
          />
          포인트 사용
        </label>
        {usePoints && (
          <div className="cart-points-input">
            <label>
              사용 포인트:
              <input
                type="number"
                value={pointsToUse}
                onChange={(e) => setPointsToUse(Number(e.target.value))}
                min="0"
                max={userInfo ? userInfo.points : 0}
              />
            </label>
          </div>
        )}
        <p>총 상품 금액: {totalPrice}원</p>
        {usePoints && <p>할인 후 금액: {finalPrice}원</p>}
      </div>
      {/* 결제하기 버튼 */}
      <button className="checkout-button" onClick={goToCheckout}>
        결제하기
      </button>
    </div>
  );
};

export default CartView;
