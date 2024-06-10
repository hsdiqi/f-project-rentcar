import React from 'react';
import 'beli.css'; // Pastikan file beli.css berada di direktori yang tepat

function BookingPage() {
  return (
    <div className="main-container">
      <header className="header">
        <span className="header-title">Dafasan<span className="header-subtitle"> RentCar</span></span>
      </header>
      <section className="content">
        <figure className="image-wrapper">
          <img loading="lazy" src="" alt="Car Image" className="image" />
        </figure>
        <section className="specs-container">
          <div className="specs-labels">
            Brand <br /> Type <br /> Capacity <br /> Max speed <br /> last serviced
          </div>
          <div className="specs-values">
            Toyota <br /> 1.5G CVT <br /> 4 People <br /> 190 km/h <br /> 12 - 9 2023
          </div>
        </section>
        <form className="form-container">
          <label htmlFor="pick-up-date" className="form-title">Pick Up Date</label>
          <input type="date" id="pick-up-date" className="date-picker" aria-label="Pick Up Date" />
          <label htmlFor="return-date" className="return-title">Date of Return</label>
          <input type="date" id="return-date" className="return-date" aria-label="Date of Return" />
          <div className="booking-container">
            {/* <div className="return-date"></div> */}
            <button type="submit" className="booking-button">Booking</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BookingPage;
