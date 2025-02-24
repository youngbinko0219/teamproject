import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/auth/DatePicker.css";

registerLocale("ko", ko);

const BirthDatePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // 연도와 월을 선택할 수 있도록 배열을 준비합니다.
  // 예: 1920년부터 현재 연도 + 몇 년까지
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 1920; y <= currentYear; y++) {
    years.push(y);
  }

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="생년월일"
      className="date-picker-input"
      locale="ko"
      /* 월/연 드롭다운 표시 (dropdownMode="select" 사용) */
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      /* 기본 헤더를 커스텀 헤더로 대체하여 상단의 '2월 2025' 영역을 숨김 */
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div className="custom-datepicker-header">
          {/* 연도 드롭다운 */}
          <select
            className="custom-datepicker-year"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>

          {/* 월 드롭다운 */}
          <select
            className="custom-datepicker-month"
            value={getMonth(date)}
            onChange={({ target: { value } }) => changeMonth(value)}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
};

export default BirthDatePicker;
