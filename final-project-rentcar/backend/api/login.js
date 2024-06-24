const express = require('express');
const oracledb = require('../dbConfig');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

const router = express.Router();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let connection;

  console.log('Endpoint login diakses');
  console.log('Email: ', email);
  console.log('Password: ', password);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan kata sandi diperlukan' });
  }

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT id_pelanggan, email, password FROM pelanggan WHERE email = :email`,
      { email }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Email tidak ditemukan' });
    }
    
    const user = result.rows[0];
    
    if (user.PASSWORD !== password) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const userID = user.ID_PELANGGAN;
    const userEMAIL = user.EMAIL;
    const accessToken = jwt.sign(
      { id_pelanggan: userID, email: userEMAIL },
      accessTokenSecret,
      { expiresIn: '1h' }
    );

    console.log('Token akses berhasil dibuat: ', accessToken);

    res.status(200).json({
      id_pelanggan: userID,
      email: userEMAIL,
      accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Kesalahan saat menutup koneksi OracleDB:', err);
      }
    }
  }
});

module.exports = router;
