import "../../assets/css/productdetail/ProductTabs.css";

const ProductTabs = ({ currentSection }) => {
  const tabs = [
    { id: "detail", label: "상품상세정보" },
    { id: "exchange", label: "교환 및 반납/연장 안내" },
    { id: "review", label: "상품후기" },
  ];

  const handleScroll = (id) => {
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="product-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${currentSection === tab.id ? "active" : ""}`}
          onClick={() => handleScroll(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
