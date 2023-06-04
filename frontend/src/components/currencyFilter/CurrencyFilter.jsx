import React, { useState } from "react";
import "./currencyFilter.css";

const CurrencyFilter = ({ filter, setFilter }) => {
  const [active, setActive] = useState(null);

  const handleClick = (id) => {
    setActive(id);
    if (id === 1) {
      setFilter({ ...filter, currency: "ETH" });
    }
    if (id === 2) {
      setFilter({ ...filter, currency: "USD" });
    }
    if (id === 3) {
      setFilter({ ...filter, currency: "INR" });
    }
  };

  return (
    <div className="currencyChangeContainer">
      <h3 className="currencyHeading">Currency</h3>
      <button
        onClick={() => handleClick(1)}
        className={active === 1 ? "currencyButtonActive" : "currencyButton"}
      >
        ETH
      </button>
      <button
        onClick={() => handleClick(2)}
        className={active === 2 ? "currencyButtonActive" : "currencyButton"}
      >
        USD
      </button>
      <button
        onClick={() => handleClick(3)}
        className={active === 3 ? "currencyButtonActive" : "currencyButton"}
      >
        INR
      </button>
    </div>
  );
};
export default CurrencyFilter;
