"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { useNavigate } from "react-router-dom"
import "../css/pages/index.css"

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const akses = localStorage.getItem("accessToken")
  console.log("Akses TOKEN: ", akses)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 50) {
        setNavbarVisible(false)
        setIsScrolled(true)
      } else {
        setNavbarVisible(true)
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("accessToken")
    setIsLoggedIn(false)
    navigate("/signIn")
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light navbar-custom fixed-top ${
        navbarVisible ? "" : "hidden"
      } ${isScrolled ? "scrolled" : ""}`}
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
              <Link className="nav-link" to="Home" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/catalog"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/catalog")
                }}
              >
                Catalog
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Review" smooth={true} duration={500}>
                Review
              </Link>
            </li>
          </ul>
          <div className="d-grid gap-2 d-md-block ms-auto gripper-custom">
            {isLoggedIn ? (
              <button className="btn btn-custom" type="button" onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <>
                <button className="btn btn-custom" type="button" onClick={() => navigate("/signIn")}>
                  Sign In
                </button>
                <button className="btn btn-primary" type="button" onClick={() => navigate("/signUp")}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
