import { useState } from "react";
import "../../assets/css/productdetail/Dropdown.css";

const Dropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown ${isOpen ? "expanded" : ""}`}>
      <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </button>
      <ul className="dropdown-menu">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
