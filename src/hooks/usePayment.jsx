// src/hooks/usePayment.jsx
import { useState, useEffect, useCallback } from "react";
import { getPaymentHistory } from "../services/paymentService";

const usePayment = (userId) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPaymentHistory(userId);
      setPaymentHistory(data.history || []);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId, fetchHistory]);

  return { paymentHistory, loading, error, refetch: fetchHistory };
};

export default usePayment;
