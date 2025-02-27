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
  // 추가: 주소 입력을 위한 상태 변수
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // zustand 스토어에서 사용자 정보를 가져옴 (userInfo에 포인트 등 정보가 포함되어 있다고 가정)
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

  // 결제 미리보기 API에 POST 요청을 백그라운드로 진행하고, 바로 /checkout으로 이동
  const handleCheckout = () => {
    // 각 아이템에 대해 rewardPoints 계산: productId가 10 미만이면 1%, 10 이상이면 2%
    const mappedCartItems = cartItems.map((item) => {
      const price = item.price || 10000;
      const rewardPoints =
        item.productId < 10
          ? Math.round(price * 0.01)
          : Math.round(price * 0.02);
      return {
        productId: item.productId,
        productName: `Product ${item.productId}`, // 실제 제품명이 있다면 해당 값을 사용
        price: price,
        quantity: item.quantity,
        orderStock: 1,
        rentalStart: item.rentalDate,
        rewardPoints: rewardPoints,
        productImage: "default-image.png", // 실제 이미지 URL이 있다면 해당 값을 사용
      };
    });

    // 전체 보상 포인트 합계 계산
    const totalRewardPoints = mappedCartItems.reduce(
      (sum, item) => sum + item.rewardPoints * item.quantity,
      0
    );

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + (item.price || 10000) * item.quantity,
      0
    );

    const payload = {
      userId: userInfo?.id || "user1",
      userName: userInfo?.name || "홍길동1",
      userPhone: userInfo?.phone || "010-1111-0001",
      // 주소는 사용자가 입력한 값 사용 (예시로 userAddr2에 저장)
      userAddr1: "",
      userAddr2: address,
      userAddr3: "",
      userEmail: userInfo?.email || "user1@example.com",
      userPoints: userInfo?.points || 3000,
      cartItems: mappedCartItems,
      totalRewardPoints: totalRewardPoints,
      totalProductPrice: totalPrice,
    };

    // POST API 호출 (결과를 기다리지 않고 백그라운드에서 진행)
    fetch("http://localhost:8080/cart-order/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error("결제 미리보기 요청 중 오류 발생:", error);
    });

    // POST API 호출 여부와 상관없이 무조건 /checkout으로 이동
    navigate("/checkout");
  };

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

      {/* 주소 입력 필드 */}
      <div className="cart-address-section">
        <label>
          배송 주소 :&nbsp;
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소를 입력하세요"
          />
        </label>
      </div>

      {/* 결제하기 버튼 */}
      <button className="checkout-button" onClick={handleCheckout}>
        결제하기
      </button>
    </div>
  );
};

export default CartView;
