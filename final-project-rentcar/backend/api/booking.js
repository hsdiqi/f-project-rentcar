const express = require("express");
const oracledb = require("../dbConfig");
const jwt = require("jsonwebtoken");
let { authenticateToken } = require("../jwtToken");


const router = express.Router();

router.post("/prebookcar", async (req, res) => {
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

  router.post("/booking", authenticateToken, async (req, res) => {
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

  module.exports = router;