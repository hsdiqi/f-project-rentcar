const express = require("express");
const oracledb = require("../dbConfig");
const jwt = require("jsonwebtoken");
let { accessTokenSecret } = require("../jwtToken");

const router = express.Router();

router.post("/login", async (req, res) => {
    const {email , password} = req.body;
    let connection;
    accessTokenSecret = "user"
    console.log("Login endpoint hit");
  console.log("email: ", email);
  console.log("password: ", password);
  console.log("accessTokenSecret:", accessTokenSecret); 

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan kata sandi diperlukan" });
  }

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
        `SELECT id_pelanggan, email, password FROM pelanggan WHERE email :email`, {email}
    );

    const user = result.rows[0];
    if (!user) {
        return res.status(404).json({ error: "Email tidak ditemukan"})
    } else if(useer.PASSWORD !== password){
        return res.status(401).json({ error: "kata sandi salah"})
    }

    const accessToken = jwt.sign(
        { id_pelanggan: user.ID_PELANGGAN, email: user.EMAIL},
        accessTokenSecret,
        {expiresIn: "1h"}
    )

    console.log("Token akses berhasil dibuat: ", accessToken)

    res.status(200).json({
        id_pelanggan: user.ID_PELANGGAN,
        email: DashboardAdmin.EMAIL,
        accessToken
    })
  } catch(err){
    console.error(err)
    res.status(500).json({ error: "terjadi kealan server"})

  } finally {
    if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing OracleDB connection:', err);
        }
      }
  }
})

module.exports = router;