const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const app = express();
const port = 3001;
const jwt = require("jsonwebtoken"); //npm install jsonwebtoken

const bodyParser = require("body-parser");

// pemanggilan API
const loginAdmin = require("./api/loginAdmin")
const listCar = require("./api/dashboardAdmin/dashboardAdmin");
const mobil = require("./api/dashboardAdmin/mobil");
const pesanan = require("./api/dashboardAdmin/pesanan")
// const login = require("./api/login")
// const mostbook = require("./api/mostBook")
// const reviews = require("./api/reviews")
// const signUp = require("./api/signUp")
// const katalog = require("./api/katalog")
// const booking = require("./api/booking")

app.use(cors({
  origin: 'http://localhost:3000', // Sesuaikan dengan URL frontend Anda
  credentials: true, // Jika memerlukan mengirim cookie atau header lain
}));
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

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded; // Menyimpan payload dari token di req.user
    next();
  });
}

// API untuk most book
// app.use("/api", mostbook)
app.get("/api/mostbook", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const cars = await connection.execute(
      `SELECT *
       FROM (
         SELECT *
         FROM V_KENDARAAN_MOSTBOOK
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
// app.use("/api", reviews )
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
// app.use("/api", login)
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
    }

    const accessToken = jwt.sign(
      { id_pelanggan: user.ID_PELANGGAN, email: user.EMAIL },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("accsess token: ", accessToken);

    res.status(200).json({
      id_pelanggan: user.ID_PELANGGAN,
      email: user.EMAIL,
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
        console.error(err);
      }
    }
  }
});

// API untuk Sign Up
// app.use("/api", signUp)
app.post("/api/signUp", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const { namaDepan, namaBelakang, nik, email, alamat, noTelp, password } =
      req.body;
    console.log(
      "nama depan: ",
      namaDepan,
      "nama belakang: ",
      namaBelakang,
      "nik: ",
      nik,
      "email: ",
      email,
      "notelp: ",
      noTelp,
      "pass: ",
      password
    );

    if (
      !namaDepan ||
      !namaBelakang ||
      !nik ||
      !email ||
      !alamat ||
      !noTelp ||
      !password
    ) {
      return res.status(400).json({
        message: "Semua kolom harus diisi",
        namaDepan: namaDepan,
        namaBelakang: namaBelakang,
        nik: nik,
        email: email,
        alamat: alamat,
        noTelp: noTelp,
        password: password,
      });
    }

    const userCheckResult = await connection.execute(
      `SELECT COUNT(*) AS user_count FROM pelanggan WHERE nik = :nik OR email = :email`,
      { nik, email }
    );

    const userCount = userCheckResult.rows[0].USER_COUNT; // Perbaiki penulisan nama kolom hasil query

    if (userCount > 0) {
      return res.status(409).json({ error: "NIK atau email sudah terdaftar" });
    }

    const seqResult = await connection.execute(
      `SELECT id_pelanggan
      FROM (
        SELECT id_pelanggan
        FROM pelanggan
        ORDER BY id_pelanggan DESC
      )
      WHERE ROWNUM = 1`
    );

    const lastId = seqResult.rows[0].ID_PELANGGAN;

    let seqValue;
    if (lastId != null) {
      seqValue = lastId + 1;
    } else {
      seqValue = lastId;
    }
    console.log("SEQ value", seqValue);

    const result = await connection.execute(
      `INSERT INTO pelanggan (id_pelanggan, nama_depan, nama_belakang, nik, email, alamat, nomor_telepon, password)
       VALUES (:id_pelanggan, :nama_depan, :nama_belakang, :nik, :email, :alamat, :nomor_telepon, :password)`,
      {
        id_pelanggan: seqValue,
        nama_depan: namaDepan,
        nama_belakang: namaBelakang,
        nik,
        email,
        alamat,
        nomor_telepon: noTelp,
        password,
      },
      { autoCommit: true }
    );

    res.status(201).json({ message: "User registered successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error", err });
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

// api untuk katalog
// app.use("/api", katalog)
app.post("/api/carlist", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const { sortBy, carCategory } = req.body;
    console.log(sortBy, carCategory);

    let orderByClause = "";
    if (sortBy === "lPrice") {
      orderByClause = "ORDER BY HARGA ASC";
    } else if (sortBy === "hPrice") {
      orderByClause = "ORDER BY HARGA DESC";
    }

    // Menggunakan template literal untuk menggabungkan orderByClause ke dalam query
    let query = `
      SELECT * 
      FROM v_list_car_katalog
      WHERE TIPE_KENDARAAN = :carCategory
      ${orderByClause}
    `;

    let result = await connection.execute(query, { carCategory });
    const listResult = { cars: result.rows };

    // console.log(listResult);

    // Kirim hasil kueri sebagai respons
    res.json(listResult);
  } catch (err) {
    // Tangani kesalahan
    console.error("Error executing SQL:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Pastikan koneksi ditutup setelah digunakan
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// api untuk mendapatkan data kendaraan
// app.use("/api", booking)
app.post("/api/prebookcar", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const { carId } = req.body;
    // console.log(carId)

    let carResult = await connection.execute(
      `SELECT * FROM kendaraan WHERE id_kendaraan = :carId`,
      { carId }
    );
    // const userGetResult = { user: userResult.rows };
    const carGetResult = { car: carResult.rows };

    res.json(carGetResult);
  } catch (err) {
    console.error("Error executing SQL:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// api untuk booking
app.post("/api/booking", authenticateToken, async (req, res) => {
  let connection;
  const bookStatus = "telah dipesan";

  try {
    connection = await oracledb.getConnection(dbConfig);

    const {
      userId,
      carId,
      pickDate,
      returnDate,
      sumPrice,
      bookDate,
    } = req.body;

    if (!pickDate || !returnDate) {
      console.log("pick: ", pickDate," return: ", returnDate)
      return res.status(404).json({ message: "tanggal harus diisi" });
    }

    console.log("id user dari request", userId)
    let idUser = req.user.id_pelanggan
    console.log("id user dari token: ",idUser)

    const seqResult = await connection.execute(
      `SELECT id_pemesanan
      FROM (
        SELECT id_pemesanan
        FROM pemesanan
        ORDER BY id_pemesanan DESC
      )
      WHERE ROWNUM = 1`
    );

    const lastId = seqResult.rows[0].ID_PEMESANAN;
    let seqValue;
    if (lastId != null) {
      seqValue = lastId + 1;
    } else {
      seqValue = 1;
    }
    console.log("SEQ value", seqValue);

    let result = await connection.execute(
      `INSERT INTO pemesanan(id_pemesanan, tanggal_pemesanan, tangga_mulai_sewa, tanggal_akhir_sewa, total, status_pemesanan, pelanggan_id_pelanggan, kendaraan_id_kendaraan)
      VALUES(:bookId, TO_DATE(:bookDate, 'YYYY-MM-DD'), TO_DATE(:pickDate, 'YYYY-MM-DD'), TO_DATE(:returnDate, 'YYYY-MM-DD'), :sumPrice, :bookStatus, :userId, :carId)`,
      {
        bookId: seqValue,
        bookDate,
        pickDate,
        returnDate,
        sumPrice,
        bookStatus,
        userId: req.user.id_pelanggan, // Menggunakan id_pelanggan dari token
        carId,
      },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Booking berhasil", result });
    console.log("booking sukses")

  } catch (err) {
    console.error("Error executing SQL:", err);
    res.status(500).json({ error: "Internal Server Error" });

  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// memanggil API login untuk Admin
app.use("/api" ,loginAdmin)

// memanggil api untuk dashboard admin
app.use("/api", listCar)

// memanggil api mobil(list mobil di dashboardAdmin/mobil)
app.use("/api", mobil)

// memanggil API pesanan
app.use("/api", pesanan)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
