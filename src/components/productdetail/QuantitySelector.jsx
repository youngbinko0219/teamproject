import React, { useState } from "react";
import "../../assets/css/productdetail/QuantitySelector.css";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="quantity-selector">
      <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
    </div>
  );
};

export default QuantitySelector;
