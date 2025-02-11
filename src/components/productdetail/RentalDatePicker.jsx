import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/productdetail/RentalDatePicker.css";

const RentalDatePicker = ({ selectedDate, onSelect }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onSelect}
      dateFormat="yyyy-MM-dd"
      className="rental-datepicker-input" /* ✅ 팀원 코드처럼 input만 사용 */
      placeholderText="대여 시작일 선택"
    />
  );
};

export default RentalDatePicker;
