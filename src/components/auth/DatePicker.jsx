import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BirthDatePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null); // 🔹 선택된 날짜 상태 추가

  const handleDateChange = (date) => {
    setSelectedDate(date); // 🔹 선택한 날짜를 상태에 저장
    onChange(date); // 🔹 부모 컴포넌트로 선택한 날짜 전달
  };

  return (
    <DatePicker
      selected={selectedDate} // 🔹 상태를 selected prop에 전달
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="생년월일"
    />
  );
};

export default BirthDatePicker;
