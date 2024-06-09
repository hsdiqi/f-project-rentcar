const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const app = express();
const port = 3001;
const jwt = require("jsonwebtoken"); //npm install jsonwebtoken

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// tambahan install nodemon "npm install -g nodemon" digunakan agar server bisa auto restart

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: "C:\\instanclient\\instantclient_19_23" });

// Inisialisasi kunci rahasia untuk token JWT
const accessTokenSecret = "your-access-token-secret";

// Konfigurasi database
const dbConfig = {
  user: "pandawa",
  password: "12345678",
  connectString: "localhost/xe",
  externalAuth: false,
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// API untuk car
app.get("/api/cars", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const cars = await connection.execute(
      `SELECT *
       FROM (
         SELECT *
         FROM V_KENDARAAN_KATALOG
         ORDER BY BANYAK_SEWA DESC
       )
       WHERE ROWNUM <= 3`
    );

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

// API untuk reviews
app.get("/api/reviews", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const reviewss = await connection.execute(
      `SELECT *
       FROM (
         SELECT *
         FROM V_PELANGGAN_MEMBERSHIP
         WHERE JENIS_MEMBERSHIP = 'Gold'
       )
       WHERE ROWNUM <= 4`
    );

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

// API untuk verif login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login endpoint hit");
  let connection;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan kata sandi diperlukan" });
  }

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT id_pelanggan, email, password FROM pelanggan WHERE email = :email`,
      { email }
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "EMAIL NOT FOUND" });
    }
    const user = result.rows[0];
    if (user.PASSWORD !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    };

    const accessToken = jwt.sign({ id_pelanggan: user.ID_PELANGGAN, email: user.EMAIL }, accessTokenSecret, { expiresIn: '1h' });

    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log(accessToken)

    res.status(200).json({
      id_pelanggan: user.ID_PELANGGAN,
      email: user.EMAIL,
      accessToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
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

// API untuk sign up
app.post("/api/signup", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const { namadepan, namabelakang, nik, email, telp, password } = req.body;

    const result = await connection.execute(
      `INSERT INTO pelanggan (id_pelanggan, nama_depan, Nama_Belakang, nik, email, NOMOR_TELEPON, password)
       VALUES (pelanggan_seq.NEXTVAL, :namadepan, :namabelakang, :nik, :email, :NOMOR_TELEPON, :password)`,
      { namadepan, namabelakang, nik, email, NOMOR_TELEPON: telp, password },
      { autoCommit: true }
    );

    res.status(201).json({ message: "User registered successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering user" });
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
