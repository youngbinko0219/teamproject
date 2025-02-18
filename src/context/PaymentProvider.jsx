// src/context/PaymentProvider.jsx
import { useState } from "react";
import PaymentContext from "./PaymentContext";

const PaymentProvider = ({ children }) => {
  const [currentPayment, setCurrentPayment] = useState(null);

  const value = { currentPayment, setCurrentPayment };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export default PaymentProvider;
