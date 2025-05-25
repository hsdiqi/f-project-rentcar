"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../../css/pages/loginAdmin.css"

function LoginAdmin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault()
    setIsLoading(true)

    axios
      .post("http://localhost:3001/api/loginAdmin", { email, password })
      .then((response) => {
        const { accessToken, adminId } = response.data
        localStorage.setItem("accessTokenAdmin", accessToken)
        localStorage.setItem("adminId", adminId)

        if (response.status === 200) {
          setAlert(
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Berhasil!</strong> Login berhasil, mengalihkan ke dashboard...
              <button type="button" className="close" onClick={() => setAlert(null)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>,
          )

          // Delay navigation to show success message
          setTimeout(() => {
            navigate("/dashboardAdmin")
          }, 1500)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        let errorMessage = "Terjadi kesalahan sistem"

        if (error.response) {
          switch (error.response.status) {
            case 404:
              errorMessage = "Email tidak ditemukan"
              break
            case 401:
              errorMessage = "Password salah"
              break
            case 400:
              errorMessage = "Email dan password harus diisi"
              break
            case 500:
              errorMessage = "Server error, coba lagi nanti"
              break
            default:
              errorMessage = "Login gagal, periksa kembali data Anda"
          }
        }

        setAlert(
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {errorMessage}
            <button type="button" className="close" onClick={() => setAlert(null)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>,
        )
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col">
                  <div className="p-5">
                    <div className="text-center">
                      <div className="welcome-message">
                        <h5>Admin Portal</h5>
                        <p>Masuk ke dashboard administrasi</p>
                      </div>
                      <h1 className="h4 text-gray-900 mb-4">
                        Selamat Datang Kembali!
                        <div className="admin-badge">ADMIN</div>
                      </h1>
                    </div>

                    {/* Alert Component */}
                    {alert}

                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            name="email"
                            placeholder="Email Administrator"
                            autoComplete="email"
                            required
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <button
                        className={`btn btn-primary btn-user btn-block ${isLoading ? "loading" : ""}`}
                        type="submit"
                        name="login"
                        disabled={isLoading}
                      >
                        {isLoading ? "" : "Masuk ke Dashboard"}
                      </button>
                    </form>

                    <div className="security-notice">
                      <strong>Keamanan:</strong> Halaman ini hanya untuk administrator yang berwenang
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin
