const express = require("express");
const oracledb = require("../../dbConfig");

const router = express.Router();

router.get("/listPesanan", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const bookingList = await connection.execute(
      `SELECT * FROM v_detail_pesanan`
    );

    const result = {
      bookings: bookingList.rows,
    };
    res.json(result);
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

router.post("/updateBooking", async (req, res) => {
  let connection;
  const {
    bookingID,
    userID,
    paymentID,
    namaDepan,
    namaBelakang,
    notelp,
    datePick,
    returnDate,
    statusBooking,
    email,
    methodPayment,
    datePayment,
  } = req.body;

  try {
    connection = await oracledb.getConnection();

    // const datePaymentObj = new Date(datePayment);
    // const datePaymentIsoString = datePaymentObj.toISOString();

    const isValidDate = (dateString) => {
      // Contoh validasi sederhana untuk format YYYY-MM-DD
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    };

    if (!isValidDate(datePayment)) {
      console.error("Invalid date format for datePayment:", datePayment);
      return res.status(400).send("Invalid date format for datePayment");
    }
    if (!isValidDate(returnDate)) {
      console.error("Invalid date format for returnDate:", returnDate);
      return res.status(400).send("Invalid date format for returnDate");
    }
    if (!isValidDate(datePick)) {
      console.error("Invalid date format for datePick:", datePick);
      return res.status(400).send("Invalid date format for datePick");
    }
    // const formattedDatePayment = datePayment.toISOString().slice(0, 10); // 'YYYY-MM-DD'

    console.log("user id: ", userID, "paymentId:", paymentID, " bookingId:", bookingID)
    console.log("payment date: ", datePayment)
    console.log("Pick date: ", datePick)
    console.log("return date: ", returnDate)

    const updatePayment = await connection.execute(
      `UPDATE pembayaran
        SET metode_pembayaran = :methodPayment,
        tanggal_pembayaran = TO_DATE(:datePayment, 'YYYY-MM-DD')
        WHERE id_pembayaran = :paymentID`,
      { methodPayment, datePayment, paymentID },
      { autoCommit: true }
    );
    console.log("payment update sukses");

    const upateUser = await connection.execute(
      `UPDATE pelanggan
        SET nama_depan = :namaDepan,
        nama_belakang = :namaBelakang,
        nomor_telepon = :notelp,
        email = :email
        WHERE id_pelanggan = :userID`,
      { namaDepan, namaBelakang, notelp, email, userID },
      { autoCommit: true }
    );
    console.log("user update sukses");

    const updateBooking = await connection.execute(
      `UPDATE pemesanan
          SET tangga_mulai_sewa = TO_DATE(:datePick, 'YYYY-MM-DD'),
          tanggal_akhir_sewa = TO_DATE(:returnDate, 'YYYY-MM-DD'),
          status_pemesanan = :statusBooking
          WHERE id_pemesanan = :bookingID`,
      { datePick, returnDate, statusBooking, bookingID },
      { autoCommit: true }
    );

    console.log("booking update sukses");

    console.log("update sukses");
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).send(err.message);
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

router.post("/delBooking", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const { id } = req.body;
    console.log("id request: ", id);

    const result = await connection.execute(
      `DELETE FROM pemesanan WHERE id_pemesanan = :id`,
      { id },
      { autoCommit: true }
    );
    console.log("Deleted booking with ID:", id, result);

    res.status(200).json({ message: "Booking deleted successfully" });
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

module.exports = router;
