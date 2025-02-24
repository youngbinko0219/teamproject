// src/components/cart/CartView.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../../services/CartService";
import "../../assets/css/mypage/CartView.css";

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 컴포넌트가 마운트될 때 장바구니 아이템 불러오기
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
        setCartItems([]); // 장바구니 비우기
        console.log("장바구니가 비워졌습니다.");
      })
      .catch((error) => {
        console.error("장바구니 비우기 중 오류 발생:", error);
      });
  };

  // 결제 페이지로 이동하는 함수
  const goToCheckout = () => {
    navigate("/checkout"); // 결제 페이지로 이동
  };

  return (
    <div className="cart-view">
      <h1>장바구니</h1>
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
      <button className="clear-cart-button" onClick={handleClearCart}>
        장바구니 비우기
      </button>
      &nbsp;
      {/* 결제 페이지로 이동하는 버튼 추가 */}
      <button className="checkout-button" onClick={goToCheckout}>
        결제하기
      </button>
    </div>
  );
};

export default CartView;
