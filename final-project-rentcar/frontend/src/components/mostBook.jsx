import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/pages/index.css';

function MostBook() {
  const [mostBook, setMostBook] = useState([]);

  useEffect(() => {
    // Mengambil data dari database saat komponen dimuat
    axios.get('http://localhost:3001/api/mostbook')
      .then(response => {
        // Pastikan respons memiliki properti "kendaraan" yang berupa array
        if (Array.isArray(response.data.cars)) {
          console.log("response: ",response.data)
          setMostBook(response.data.cars);
        } else {
          console.error('Data fetched does not contain "kendaraan" array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching top cars:', error);
      });
  }, []);

  return (
    <nav className="top-rate">
      <h1>Most Book Car</h1>
      <div className="container-top-rate">
        {mostBook.map((car, index) => (
          <div key={index} className="card h-100 card-custom" style={{ background: '#4bb6d6' }}>
            <img src={`/assets/${car.FOTO_KENDARAAN}`} className="card-img-top img-custom" alt="..." />
            <h2>{car.NAMA_KENDARAAN}</h2>
            <div className="cars-detail">
              <div>
                <img src="/assets/Group.svg" alt="" />
                <span>{car.CAP_PENUMPANG}</span>
              </div>
              <div>
                <img src="/assets/Pressure.png" alt="" />
                <span>{car.TOP_SPEED} Km/H</span>
              </div>
              <div>
                <img src="/assets/Setting_line.png" alt="" />
                <time dateTime={car.LAST_SERVICE}>{car.LAST_SERVICE}</time>
              </div>
            </div>
            <button className="btn2-custom">Book Now</button>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default MostBook;
