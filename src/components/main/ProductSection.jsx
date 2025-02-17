const ProductSection = ({ title, children }) => (
  <div className="product-section">
    <h2>{title}</h2>
    {children}
  </div>
);

export default ProductSection;
