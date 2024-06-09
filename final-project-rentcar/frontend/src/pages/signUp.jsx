import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './signUp.css'; // Ensure the path to your CSS file is correct

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    email: '',
    telp: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSignUp = (su) => {
    // Handle sign-up logic here
    console.log(formData);
    // Redirect to sign-in page or other logic
    // history.push('/sign-in');
  };

  return (
    <div className="container" style={{ paddingLeft: '0px', paddingRight: '0px', marginRight: '0px', marginLeft: '0px' }}>
      <div className="form-sect">
        <div className="logo-container">
          <span><b>DAFASAN</b> <span>RentCar</span></span>
        </div>
        <div className="wrapper-form">
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama Depan</label>
          <input type="text" className="form-control" id="namadepan" placeholder="" value={formData.nama} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama Belakang</label>
          <input type="text" className="form-control" id="namabelakang" placeholder="" value={formData.nama} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="nik" className="form-label">NIK</label>
          <input type="number" className="form-control" id="nik" placeholder="" value={formData.nik} onChange={handleChange} />
        </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label ">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="telp" className="form-label">Telephone Number</label>
            <input type="number" className="form-control" id="NOMOR_TELEPON" placeholder="" value={formData.telp} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="" value={formData.password} onChange={handleChange} />
          </div>
        </div>
        <div className="wrapper-btn">
          <button className="btn btn-primary btn-custom" type="button" onClick={handleSignUp(0)}>Sign Up</button>
        </div>
        <div className="sign-up-section">
          <div className="sign-up-text">Have an Account?</div>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </div>
      <div className="image-column">
        {/* <img src="/assets/pajero-sign.png" alt="pajero32" className="image-wrapper" /> */}
      </div>
    </div>
  );
}

export default SignUp;
