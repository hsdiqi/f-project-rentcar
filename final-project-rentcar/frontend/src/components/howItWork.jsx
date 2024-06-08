import React from "react";
import "../index.css";

function HowItWorks() {
  return (
    <nav className="hiw">
      <h2>How It Work</h2>
      <div className="container-hiw">
        <div className="register">
          <img src="/assets/register-hiw.svg" alt="register" /> Register
        </div>
        <img src="/assets/Arrow_right_long.svg" alt="arrow" />
        <div className="catalog">
          <img src="/assets/katalog-hiw_fill.png" alt="catalog" /> See Catalog
        </div>
        <img src="/assets/Arrow_right_long.svg" alt="arrow" />
        <div className="date">
          <img src="/assets/date.png" alt="date" /> Pick-Up Date
        </div>
        <img src="/assets/Arrow_right_long.svg" alt="arrow" />
        <div className="car">
          <img src="/assets/car-hiw.svg" alt="car" /> Book Your Car
        </div>
      </div>
    </nav>
  );
}

export default HowItWorks;
