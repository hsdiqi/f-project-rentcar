import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
    .post("http://localhost:3001/api/loginAdmin", {email, password})
    .then((response) => {
        const  { accessToken, adminId } = response.data;
        localStorage.setItem("accessTokenAdmin", accessToken);
        localStorage.setItem("adminId", adminId);

        if (response.status === 200) {
            setAlert(<div className="alert alert-success alert-dismissible fade show" role="alert">
              Login berhasil!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>);
          } else {
            setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
              Login gagal! Cek kembali email dan password.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>);
          }
        navigate("/dashboardAdmin");
    })
    .catch((error) => {
        if (error.response.status === 404) {
          setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
            Email not found
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>);
        } else if (error.response.status === 401) {
          setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
            Incorrect password
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>);
        } else if (error.response.status === 400) {
          setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
            Need email and password
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>);
        } else if (error.response.status === 500) {
          setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
            Server error
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>);
        } else {
          console.error("Error:", error);
        }
      });
  };

  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    {/* Alert Component */}
                    {alert}
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          name="email"
                          placeholder="Email"
                          autoComplete="off"
                          required="required"
                          autoFocus
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          name="password"
                          placeholder="Password"
                          required="required"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button className="btn btn-primary btn-user btn-block" type="submit" name="login">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
