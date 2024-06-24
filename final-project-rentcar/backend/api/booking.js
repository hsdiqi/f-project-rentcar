const express = require("express");
const oracledb = require("./../dbConfig");
const jwt = require("jsonwebtoken");
let { authenticateToken } = require("./../jwtToken");
require("dotenv").config();

const router = express.Router();

router.post("/prebookcar", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();

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

router.post("/booking", authenticateToken, async (req, res) => {
  let connection;
  const bookStatus = "telah dipesan";
  console.log("booking hit");

  try {
    connection = await oracledb.getConnection();

    const { carId, pickDate, returnDate, sumPrice, bookDate } = req.body;

    if (!pickDate || !returnDate) {
      console.log("pick: ", pickDate, " return: ", returnDate);
      return res.status(400).json({ message: "Tanggal harus diisi" });
    }

    // Mendekode token untuk mendapatkan id_pelanggan
    const token = req.headers.authorization.split(" ")[1];
    console.log("token dari header", token);
    const idUser = req.user.id_pelanggan; // Mendapatkan id_pelanggan dari token

    console.log("id user dari token: ", idUser);

    let bookingID = "";
    let result = await connection.execute(
      `INSERT INTO pemesanan( tanggal_pemesanan, tangga_mulai_sewa, tanggal_akhir_sewa, total, status_pemesanan, pelanggan_id_pelanggan, kendaraan_id_kendaraan)
      VALUES( TO_DATE(:bookDate, 'YYYY-MM-DD'), TO_DATE(:pickDate, 'YYYY-MM-DD'), TO_DATE(:returnDate, 'YYYY-MM-DD'), :sumPrice, :bookStatus, :idUser, :carId)
      RETURNING id_pemesanan INTO :bookingID`,
      {
        bookDate,
        pickDate,
        returnDate,
        sumPrice,
        bookStatus,
        idUser, // Menggunakan id_pelanggan dari token
        carId,
        bookingID: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      },
      { autoCommit: true }
    );

    bookingID = result.outBinds.bookingID[0];
    console.log("bookingid: ", bookingID);
    const payment = await connection.execute(
      `INSERT INTO pembayaran(jumlah_pembayaran, pemesanan_id_pemesanan)
      VALUES(:sumPrice, :bookingID )`,
      { sumPrice, bookingID },
      { autoCommit: true }
    );

    const update = await connection.execute(
      `UPDATE kendaraan SET status = 'Tidak Tersedia'
      WHERE id_kendaraan = :carId`,
      { carId },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Booking berhasil", result });
    console.log("booking sukses");
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

module.exports = router;

module.exports = router;
