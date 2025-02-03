import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BirthDatePicker = ({ onChange }) => {
  return (
    <DatePicker
      selected={null}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="생년월일 선택"
    />
  );
};

export default BirthDatePicker;
