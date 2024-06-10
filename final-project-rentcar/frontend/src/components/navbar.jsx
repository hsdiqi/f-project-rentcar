import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Periksa apakah ada token yang tersimpan di local storage
    const accessToken = localStorage.getItem("accessToken");
    let localAccessToken = localStorage.getItem("access token");

    if (accessToken === null) {
      setIsLoggedIn(false);
    } else {
      if (accessToken === localAccessToken) {
        setIsLoggedIn(true);
      }
    }

    // Jika ada token, lakukan verifikasi token
    // if (accessToken) {
    //   // Lakukan verifikasi token di sini, misalnya menggunakan fungsi jwt.verify
    //   // Contoh:
    //   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //       // Jika token tidak valid, pengguna tidak login
    //       setIsLoggedIn(false);
    //     } else {
    //       // Jika token valid, pengguna sudah login
    //       setIsLoggedIn(true);
    //     }
    //   });

    //   // Untuk tujuan demonstrasi, asumsikan token selalu valid
    //   setIsLoggedIn(true);
    // } else {
    //   // Jika tidak ada token, pengguna tidak login
    //   setIsLoggedIn(false);
    // }
  }, []);

  const handleSignOut = () => {
    // Hapus token dari local storage
    localStorage.removeItem("accessToken");
    // Ubah status login menjadi false
    setIsLoggedIn(false);
    // Redirect ke halaman sign in
    navigate("/signIn");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light navbar-custom fixed-top el-navbar ${
        navbarVisible ? "" : "hidden"
      }`}
      style={{ backgroundColor: "#ffffff00" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#home">
          <span>PANDAWA</span> RentCar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="Home"
                smooth={true}
                duration={500}
                onClick={() => navigate("/")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="Catalog"
                smooth={true}
                duration={500}
              >
                Catalog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="Review"
                smooth={true}
                duration={500}
              >
                Review
              </Link>
            </li>
          </ul>
          <div className="d-grid gap-2 d-md-block ms-auto gripper-custom">
            {/* Tampilkan tombol sign out jika pengguna sudah login */}
            {isLoggedIn ? (
              <button
                className="btn btn-custom"
                type="button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  className="btn btn-custom"
                  type="button"
                  onClick={() => navigate("/signIn")}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/signUp")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
