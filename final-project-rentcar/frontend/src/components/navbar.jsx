import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './../index.css';

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light navbar-custom fixed-top el-navbar ${navbarVisible ? '' : 'hidden'}`} style={{ backgroundColor: '#ffffff00' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#home"><span>PANDAWA</span> RentCar</a>
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
              <Link className="nav-link" to="Home" smooth={true} duration={500}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Catalog" smooth={true} duration={500}>Catalog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Review" smooth={true} duration={500}>Review</Link>
            </li>
          </ul>
          <div className="d-grid gap-2 d-md-block ms-auto gripper-custom">
            <button className="btn btn-custom" type="button">Sign In</button>
            <button className="btn btn-primary" type="button">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
