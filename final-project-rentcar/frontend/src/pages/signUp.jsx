"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/pages/signUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleSignUp = () => {
    if (
      !namaDepan ||
      !namaBelakang ||
      !nik ||
      !email ||
      !noTelp ||
      !password ||
      !alamat
    ) {
      alert("Semua kolom harus diisi");
      return;
    }

    console.log(
      "nama depan: ",
      namaDepan,
      "nama belakang: ",
      namaBelakang,
      "nik: ",
      nik,
      "email: ",
      email,
      "notelp: ",
      noTelp,
      "pass: ",
      password
    );

    axios
      .post("http://localhost:3001/api/signUp", {
        namaDepan,
        namaBelakang,
        nik,
        email,
        alamat,
        noTelp,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          alert("Pendaftaran berhasil");
          navigate("/signIn");
        }
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert("Semua kolom harus diisi");
              break;
            case 409:
              alert("NIK atau Email sudah terdaftar");
              break;
            case 499:
              alert("pendaftaran tidak berhasil");
              break;
            case 500:
              alert("Server Error");
              break;
            default:
              alert("Terjadi kesalahan, silakan coba lagi");
          }
        } else {
          alert("Terjadi kesalahan, silakan coba lagi");
        }
      });
  };

  return (
    <div className="container">
      <div className="form-sect">
        <div className="logo-container">
          <span>
            <b>PANDAWA</b> <span>RentCar</span>
          </span>
        </div>
        <div className="wrapper-form">
          <div className="form-grid">
            <div className="mb-3">
              <label htmlFor="namaDepan" className="form-label">
                Nama Depan
              </label>
              <input
                type="text"
                className="form-control"
                id="namaDepan"
                placeholder="Masukkan nama depan"
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="namaBelakang" className="form-label">
                Nama Belakang
              </label>
              <input
                type="text"
                className="form-control"
                id="namaBelakang"
                placeholder="Masukkan nama belakang"
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 form-full-width">
            <label htmlFor="nik" className="form-label">
              NIK
            </label>
            <input
              type="number"
              className="form-control"
              id="nik"
              placeholder="Masukkan NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </div>
          <div className="mb-3 form-full-width">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="nama@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 form-full-width">
            <label htmlFor="alamat" className="form-label">
              Alamat
            </label>
            <input
              type="text"
              className="form-control"
              id="alamat"
              placeholder="Masukkan alamat lengkap"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="form-grid">
            <div className="mb-3">
              <label htmlFor="noTelp" className="form-label">
                Nomor Telepon
              </label>
              <input
                type="number"
                className="form-control"
                id="noTelp"
                placeholder="08xxxxxxxxxx"
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
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
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="wrapper-btn">
          <button
            className="btn btn-primary btn-custom"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div className="sign-up-section">
          <div className="sign-up-text">Sudah punya akun?</div>
          <Link to="/signIn">Sign In</Link>
        </div>
      </div>
      <div className="image-column">
        {/* Background image handled by CSS */}
      </div>
    </div>
  );
}

export default SignUp;
