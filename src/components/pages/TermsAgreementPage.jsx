import { useNavigate } from "react-router-dom";
import TermsAgreementForm from "../auth/TermsAgreementForm";
import "../../assets/css/pages/TermsAgreementPage.css";

const TermsAgreementPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/signup");
  };

  return (
    <div className="terms-agreement-page">
      <div className="terms-card">
        <TermsAgreementForm onNext={handleNext} />
      </div>
    </div>
  );
};

export default TermsAgreementPage;
