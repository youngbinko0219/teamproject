// src/components/productdetail/RentalDatePicker.jsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "./CustomDateInput";
import "../../assets/css/productdetail/RentalDatePicker.css";

const RentalDatePicker = ({ selectedDate, onSelect }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onSelect}
      dateFormat="yyyy-MM-dd"
      customInput={<CustomDateInput />}
    />
  );
};

export default RentalDatePicker;
