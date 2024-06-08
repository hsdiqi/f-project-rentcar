const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());

// tambahan install nodemon "npm install -g nodemon" digunakan agar server bisa auto restart

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: "C:\\oraclexe\\instantclient_19_23" });

// Konfigurasi database
const dbConfig = {
  user: "pandawa",
  password: "12345678",
  connectString: "localhost/xe",
  externalAuth: false,
};

// api untuk car
app.get("/api/cars", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Mengambil data dari beberapa tabel
    const [cars] = await Promise.all([
      connection.execute(
        `SELECT *
FROM (
    SELECT *
    FROM V_KENDARAAN_KATALOG
    ORDER BY BANYAK_SEWA DESC
)
WHERE ROWNUM <= 3`
),
    ]);

    // Menggabungkan hasil dari setiap query menjadi satu objek respons
    const result = {
      cars: cars.rows,
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
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



// api untuk reviews
app.get("/api/reviews", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const [reviewss] = await Promise.all([
      connection.execute(`SELECT *
FROM (
    SELECT *
    FROM V_PELANGGAN_MEMBERSHIP
    WHERE JENIS_MEMBERSHIP = 'Gold'
)
WHERE ROWNUM <= 4`)
    ]);

    const result = {
      reviewss: reviewss.rows,
    };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
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
