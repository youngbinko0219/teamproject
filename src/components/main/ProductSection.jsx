import ViewAllButton from "./ViewAllButton";

const ProductSection = ({ title, children, buttonProps }) => (
  <div className="product-section">
    <h2>{title}</h2>
    {children}
    <ViewAllButton to={buttonProps.to} label={buttonProps.label} />
  </div>
);

export default ProductSection;
