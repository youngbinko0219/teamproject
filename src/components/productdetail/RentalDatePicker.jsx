import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/productdetail/RentalDatePicker.css";

const RentalDatePicker = ({ selectedDate, onSelect }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onSelect}
      dateFormat="yyyy-MM-dd"
      className="rental-datepicker-input"
      placeholderText="대여 시작일 선택"
    />
  );
};

export default RentalDatePicker;
