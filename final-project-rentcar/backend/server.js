const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// const { authenticateToken } = require('./jwtToken'); // Adjust the path as necessary

const loginAdmin = require("./api/loginAdmin");
const listCar = require("./api/dashboardAdmin/dashboardAdmin");
const mobil = require("./api/dashboardAdmin/mobil");
const pesanan = require("./api/dashboardAdmin/pesanan");
const akun = require("./api/dashboardAdmin/akun");

const login = require("./api/login");
const mostbook = require("./api/mostBook");
const reviews = require("./api/reviews");
const signUp = require("./api/signUp");
const katalog = require("./api/katalog");
const booking = require("./api/booking");

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:3000", // Adjust to your frontend URL
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(express.json());

// Use the login route without authentication
app.use("/api", login);

// Use the signUp route without authentication
app.use("/api", signUp);

// Protect other routes using the authenticateToken middleware
// app.use(authenticateToken);

// API routes
app.use("/api", mostbook);
app.use("/api", reviews);
app.use("/api", katalog);
app.use("/api", booking);

// Admin routes
app.use("/api", loginAdmin);
app.use("/api", listCar);
app.use("/api", mobil);
app.use("/api", pesanan);
app.use("/api", akun);

// Example of a protected route
// app.get('/protected', authenticateToken, (req, res) => {
//   console.log("ID pengguna dari token:", req.user.id_pelanggan);
//   res.json({ message: 'Ini adalah rute yang dilindungi', user: req.user });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
