import PropTypes from "prop-types";
import "../../assets/css/productlist/SortBar.css";

const SortBar = ({ onSortChange, activeSort }) => { 
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "price-low", label: "낮은 가격순" },
    { value: "price-high", label: "높은 가격순" },
  ];

  return (
    <div className="sort-container">
      <div className="sort-menu">
        {sortOptions.map(option => (
          <button
            key={option.value}
            className={`sort-tab ${activeSort === option.value ? "active" : ""}`}
            onClick={() => onSortChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ✅ PropTypes 추가
SortBar.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  activeSort: PropTypes.string.isRequired,
};

export default SortBar;
