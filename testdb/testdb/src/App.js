import React, { useEffect, useState } from 'react';
import axios from 'axios'; //npm install axios

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    // <div className="App">
    //   <h1>Data from Oracle Database</h1>
    //   <ul>
    //     {data.map((item, index) => (
    //       <li key={index}>{item.NAMA_KENDARAAN}</li> //npm install --save-dev @babel/plugin-proposal-private-property-in-object "untuk menghilangkan warning"
    //     ))}
    //   </ul>
    // </div>
    <nav className="top-rate App">
      <h1>Most Book Car</h1>
      <div className="container-top-rate">
        {data.map(car => (
          <div key={car.ID_KENDARAAN} className="card h-100 card-custom" style={{ background: '#4bb6d6' }}>
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

export default App;
