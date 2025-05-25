const express = require('express');
const oracledb = require('oracledb'); //npm install express oracledb
const cors = require('cors'); //npm install cors
const app = express();
const port = 3001;
app.use(cors());

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: 'C:\\ProgramData\\Oracle\\instantclient_19_23' });
// C:\ProgramData\Oracle\instantclient_19_23

// Konfigurasi database
const dbConfig = {
  user: 'rentcar',         // Ganti dengan username Oracle Anda
  password: 'bee123',     // Ganti dengan password Oracle Anda
  connectString: 'localhost/xe',
  externalAuth: false // Tambahkan opsi ini untuk mode OCI

};

// Endpoint untuk mengakses data dari database
app.get('/api/data', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM KENDARAAN` // Ganti dengan nama tabel Anda
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
