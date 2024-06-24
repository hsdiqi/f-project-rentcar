import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/pages/catalog.css";

const Catalog = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [carCategory, setCarCategory] = useState("Sedan");
  const [tipeList, setTipeList] = useState("Semua");

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category")
      .then((response) => {
        if (Array.isArray(response.data.categories)) {
          setCarCategories(response.data.categories);
          console.log("Categories: ", response.data.categories);
        } else {
          console.error(
            "Response data categories bukan array: ",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching car categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/carlist", {
        sortBy,
        carCategory,
        tipeList,
      })
      .then((response) => {
        if (Array.isArray(response.data.cars)) {
          setCars(response.data.cars);
          console.log("Cars: ", response.data.cars);
        } else {
          console.error("Response data cars bukan array: ", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, [sortBy, carCategory, tipeList]);

  const handleBookNow = (id) => {
    if (accessToken && userId) {
      const car = cars.find((car) => car.ID_KENDARAAN === id);
      if (car) {
        if (car.STATUS === "Tidak Tersedia") {
          alert("Mobil sedang disewa.");
        } else {
          navigate(`/bookingPage?id=${id}`);
        }
      } else {
        alert("Mobil tidak ditemukan.");
      }
    } else {
      alert("Anda belum masuk atau mendaftar.");
      // Redirect to login page or handle authentication state
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="logo-title">
          <a
            href="/main"
            onClick={(e) => e.preventDefault()}
            style={{ textDecoration: "none" }}
          >
            <span style={{ color: "#ffffff" }}>PANDAWA</span> Rentcar
          </a>
        </h1>
        {/* <button className="logout">Logout</button> */}
      </header>
      <section className="main-content">
        <div className="content-wrapper">
          <section className="car-section">
            <section className="car-filter">
              <div className="sort-options" tabIndex="0">
                <label
                  htmlFor="car-category"
                  // className="visually-hidden"
                >
                  Kategori Mobil
                </label>
                <select
                  id="car-category"
                  className="filter-item"
                  onChange={(e) => setCarCategory(e.target.value)}
                  value={carCategory}
                >
                  {carCategories.map((category) => (
                    <option
                      key={category.TIPE_KATEGORI}
                      value={category.TIPE_KATEGORI}
                    >
                      {category.TIPE_KATEGORI}
                    </option>
                  ))}
                </select>
                <label htmlFor="tipe-kategori">Status Ketersediaan</label>
                <select
                  name="tipe-list"
                  id="tipe-list"
                  onChange={(e) => setTipeList(e.target.value)}
                  value={tipeList}
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak Tersedia">tidak tersedia</option>
                  <option value="Semua">semua</option>
                </select>
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
              <div className="car-list-header" style={{color: 'white', paddingLeft: '10px'}}>List Kendaraan</div>
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
                                      Kapasitas: {car.CAP_PENUMPANG}
                                      <br />
                                      Tipe Kendaraan: {car.TIPE_KENDARAAN}
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
