// src/components/productdetail/CustomDateInput.jsx
import React, { forwardRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "../../assets/css/productdetail/RentalDatePicker.css";

const CustomDateInput = forwardRef(({ onClick }, ref) => (
  <FaCalendarAlt className="calendar-icon" onClick={onClick} ref={ref} />
));

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
