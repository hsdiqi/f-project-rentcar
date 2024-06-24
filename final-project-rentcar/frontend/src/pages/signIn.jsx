import React, { useState } from "react";
import axios from "axios";
import "../css/pages/signIn.css";
import { Link, useNavigate } from "react-router-dom";
// import MainPage from "./../main";

function SignIn() {
  // State untuk menyimpan nilai email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Handler untuk memproses login
  const handleSignIn = () => {
    const admin = "admin";
    if(email === admin && password === admin){
      navigate("/loginAdmin")
    }
    axios
      .post("http://localhost:3001/api/login", { email, password })
      .then((response) => {
        const { accessToken, userId } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);

        navigate("/")
        // bth();
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log(email);
          alert("Email not found", error);
        } else if (error.response.status === 401) {
          alert("Incorrect password", error);
        } else if (error.response.status === 400) {
          alert("Need email n pass", error);
        } else if (error.response.status === 500) {
          alert("server error", error);
        } else {
          console.error("Error:", error);
        }
      });
  };
  // const bth = () => {
  //   console.log("Login Sukses")
  //   navigate('/main')
  // }
  // const handleSignUp = () => {
  //   // event.preventDefault();
  //   // console.log("Forgot Password clicked");
  //   navigate("/signUp");
  // };

  // const handleForgotPassword = (event) => {
  //   event.preventDefault();
  //   console.log("Forgot Password clicked");
  //   navigate("/forgotPass");
  // };

  return (
    <div className="container" style={{ padding: "0px", margin: "0px" }}>
      <div className="form-sect">
        <div className="logo-container">
          <span><a href="/main" style={{textDecoration: 'none'}}>
            <b>PANDAWA</b> <span>RentCar</span>
            </a></span>
        </div>
        <div className="wrapper-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="wrapper-btn">
          {/* Memanggil fungsi handleSignIn saat tombol Sign In diklik */}
          <button className="btn btn-primary btn-custom" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
        {/* <Link to={"/forgotPass"} className="forgot-password">
          Forgot Password
        </Link> */}
        <div className="sign-up-section">
          <div className="sign-up-text">Don't Have Account?</div>
          <Link to={"/signUp"}>Sign Up</Link>
        </div>
      </div>
      <div className="image-column">
        {/* <img src="/assets/pajero-sign.png" alt="pajero32" className="image-wrapper" /> */}
      </div>
    </div>
  );
}

export default SignIn;
