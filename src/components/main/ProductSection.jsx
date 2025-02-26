import { Link } from "react-router-dom";

const ProductSection = ({ title, children, buttonProps }) => (
  <div className="product-section">
    <h2>{title}</h2>
    {children}
    {buttonProps && (
      <Link to={buttonProps.to}>
        <button>{buttonProps.label}</button>
      </Link>
    )}
  </div>
);

export default ProductSection;
