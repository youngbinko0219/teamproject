import ViewAllButton from "./ViewAllButton";

const ProductSection = ({ title, children }) => (
  <div className="product-section">
    <h2>{title}</h2>
    {children}
    <ViewAllButton />
  </div>
);

export default ProductSection;
