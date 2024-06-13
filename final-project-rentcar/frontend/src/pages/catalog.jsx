import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/pages/catalog.css";

const Catalog = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [carCategory, setCarCategory] = useState("SUV");

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/carlist", {
        sortBy,
        carCategory,
      })
      .then((response) => {
        if (Array.isArray(response.data.cars)) {
          setCars(response.data.cars);
          console.log("response: ", response.data);
        } else {
          console.error("data response bukan array: ", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, [sortBy, carCategory]);

  const handleBookNow = (id) => {
    navigate(`/bookingPage?id=${id}`);  
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="logo-title">
          <a href="/main" onClick={navigate}>
            Dafasan Rentcar
          </a>
        </h1>
        <button className="logout">Logout</button>
      </header>
      <section className="main-content">
        <div className="content-wrapper">
          <aside className="filter-section">
            <section className="filter-wrapper">
              <h2 className="filter-title">Rental Mobil</h2>
              <form>
                <label htmlFor="car-category" className="visually-hidden">
                  Kategori Mobil
                </label>
                <select
                  id="car-category"
                  className="filter-item"
                  onChange={(e) => setCarCategory(e.target.value)}
                  value={carCategory}
                >
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedans</option>
                  <option value="Sport">Sport</option>
                </select>
                <label htmlFor="order-date" className="visually-hidden">
                  Tanggal Ambil
                </label>
                <input
                  type="date"
                  id="order-date"
                  className="input-box filter-item"
                  placeholder="Tanggal Pesan"
                />
                <label htmlFor="return-date" className="visually-hidden">
                  Tanggal Kembali
                </label>
                <input
                  type="date"
                  id="return-date"
                  className="input-box filter-item"
                  placeholder="Tanggal Kembali"
                />
                <button className="view-btn" type="submit">
                  Lihat Mobil
                </button>
              </form>
            </section>
          </aside>
          <section className="car-section">
            <section className="car-filter">
              <div className="sort-options" tabIndex="0">
                Sort by:
                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  value={sortBy}
                  style={{ color: "rgba(57, 195, 35, 1)" }}
                >
                  <option value="lprice">Low Price</option>
                  <option value="hPrice">High Price</option>
                </select>
              </div>
              <div className="car-list-header"></div>
              <div className="car-list">
                <table>
                  <tbody>
                    {cars.length > 0 &&
                      cars.map((car, index) => (
                        <tr key={index}>
                          <td>
                            <article className="car-details">
                              <figure>
                                <img
                                  src={car.FOTO_KENDARAAN}
                                  alt={car.NAMA_KENDARAAN}
                                  className="car-image"
                                />
                                <figcaption className="car-info">
                                  <h3 className="car-title">
                                    {car.NAMA_KENDARAAN}
                                  </h3>
                                  <p className="car-features">
                                    <span>
                                      Kapasitas:{" "}{car.CAP_PENUMPANG}
                                      <br/>Tipe Kendaraan:{" "}{car.TIPE_KENDARAAN}
                                    </span>
                                  </p>
                                </figcaption>
                              </figure>
                              <div className="rent-details">
                                <p className="rent-price">{car.HARGA}/day</p>
                                <button
                                  className="book-now"
                                  tabIndex="0"
                                  onClick={() =>
                                    handleBookNow(car.ID_KENDARAAN)
                                  }
                                >
                                  Book Now
                                </button>
                              </div>
                            </article>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Catalog;
