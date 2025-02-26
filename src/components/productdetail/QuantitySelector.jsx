import useProductStore from "../../hooks/useProductStore";
import "../../assets/css/productdetail/QuantitySelector.css";

const QuantitySelector = () => {
  const { quantity, setQuantity } = useProductStore();

  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQuantity = () => setQuantity(quantity + 1);

  return (
    <div className="quantity-selector">
      <button onClick={decreaseQuantity}>-</button>
      <span>{quantity}</span>
      <button onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantitySelector;
