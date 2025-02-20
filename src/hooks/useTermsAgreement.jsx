import { useState } from "react";

const useTermsAgreement = () => {
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });
  const [agreeAll, setAgreeAll] = useState(false);

  const handleIndividualChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => {
      const newAgreements = { ...prev, [name]: checked };
      // 전체 동의 여부 업데이트
      const allChecked = Object.values(newAgreements).every((v) => v);
      setAgreeAll(allChecked);
      return newAgreements;
    });
  };

  const handleAgreeAllChange = (e) => {
    const { checked } = e.target;
    setAgreeAll(checked);
    setAgreements({
      termsOfService: checked,
      privacyPolicy: checked,
      marketing: checked,
    });
  };

  return { agreements, agreeAll, handleIndividualChange, handleAgreeAllChange };
};

export default useTermsAgreement;
