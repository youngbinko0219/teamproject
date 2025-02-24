import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../assets/css/productlist/PriceRangeFilter.css";

const PriceRangeFilter = ({ setFilters }) => {
  const [price, setPrice] = useState([0, 100000]);

  const handleSliderChange = (newPrice) => {
    setPrice(newPrice);
    setFilters((prev) => ({
      ...prev,
      minPrice: newPrice[0],
      maxPrice: newPrice[1],
    }));
  };

  const handleInputChange = (index, value) => {
    const updatedPrice = [...price];
    updatedPrice[index] = Number(value) || 0;
    setPrice(updatedPrice);
    setFilters((prev) => ({
      ...prev,
      minPrice: updatedPrice[0],
      maxPrice: updatedPrice[1],
    }));
  };

  return (
    <div className="filter-section price-range-filter">
      <label>가격 범위</label>
      <Slider
        range
        min={0}
        max={1000000}
        step={1000}
        value={price}
        onChange={handleSliderChange}
        trackStyle={[{ backgroundColor: "#fa9d9a", height: 6 }]}
        handleStyle={[
          {
            backgroundColor: "#fa9d9a",
            borderColor: "#fa9d9a",
            width: 14,
            height: 14,
          },
          {
            backgroundColor: "#fa9d9a",
            borderColor: "#fa9d9a",
            width: 14,
            height: 14,
          },
        ]}
      />
      <div className="price-range">
        <input
          type="number"
          value={price[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
        />
        <span> ~ </span>
        <input
          type="number"
          value={price[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
