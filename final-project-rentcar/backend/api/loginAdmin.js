const express = require("express");
const oracledb = require("../dbConfig");
const jwt = require("jsonwebtoken");
let { accessTokenSecret } = require("../jwtToken");

const router = express.Router();

router.post("/loginAdmin", async (req, res) => {
  const { email, password } = req.body;
  let connection;
  accessTokenSecret = "bruh";
  console.log("Login endpoint hit");
  console.log("email: ", email);
  console.log("password: ", password);
  console.log("accessTokenSecret:", accessTokenSecret); // Tambahkan log ini untuk memastikan nilai


  if (!email || !password) {
    return res.status(400).json({ error: "Email dan kata sandi diperlukan" });
  }

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT id_karyawan, email, password FROM karyawan WHERE email = :email`,
      { email }
    );

    const admin = result.rows[0];
    if (!admin) {
      return res.status(404).json({ error: "EMAIL TIDAK DITEMUKAN" });
    } else if (admin.PASSWORD !== password) {
      return res.status(401).json({ error: "Kata sandi salah" });
    }

    const accessToken = jwt.sign(
      { id_karyawan: admin.ID_KARYAWAN, email: admin.EMAIL },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    console.log("Token akses berhasil dibuat:", accessToken);

    res.status(200).json({
      id_karyawan: admin.ID_KARYAWAN,
      email: admin.EMAIL,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing OracleDB connection:', err);
      }
    }
  }
});

module.exports = router;
