import "../../assets/css/productdetail/RentalPeriodSelector.css";

const RentalPeriodSelector = ({ selectedPeriod, onSelect }) => {
  const periods = ["30일", "60일", "90일"];

  return (
    <div className="rental-period-selector">
      {periods.map((period) => (
        <button
          key={period}
          className={selectedPeriod === period ? "active" : ""}
          onClick={() => onSelect(period)}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export default RentalPeriodSelector;
