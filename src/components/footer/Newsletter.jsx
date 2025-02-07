import { useState } from "react";
import "../../assets/css/footer/Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribed with:", email);
  };

  return (
    <div className="newsletter">
      <h4>Subscriber</h4>
      <p>Get 10x off your first order</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Newsletter;
