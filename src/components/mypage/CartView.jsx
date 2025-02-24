// src/components/cart/CartView.jsx
import React, { useState, useEffect } from "react";
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} from "../../services/CartService";
import "../../assets/css/cart/CartView.css";

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);

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
    // 예시 데이터, 실제 데이터 구조에 맞게 수정
    const newItem = {
      productId: 1,
      rentalPeriod: "30일",
      selectedOption: "옵션1",
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

  // 수량 증가
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

  // 수량 감소 (최소 1 이상)
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

  // 아이템 삭제
  const handleDeleteItem = (itemId) => {
    deleteCartItem(itemId)
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
      })
      .catch((error) => {
        console.error("아이템 삭제 중 오류 발생:", error);
      });
  };

  return (
    <div className="cart-view">
      <h1>장바구니</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p>상품 ID: {item.productId}</p>
            <p>대여 기간: {item.rentalPeriod}</p>
            <p>옵션: {item.selectedOption}</p>
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
      <button className="add-item-button" onClick={handleAddItem}>
        아이템 추가
      </button>
    </div>
  );
};

export default CartView;
