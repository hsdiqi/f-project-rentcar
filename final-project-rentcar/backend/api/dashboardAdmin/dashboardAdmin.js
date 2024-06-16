const express = require("express");
const oracledb = require("../../dbConfig");

const router = express.Router();

// Middleware to handle errors uniformly
const handleErrors = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message });
};

// Route to fetch data for Dashboard Admin
router.get("/DashBoardAdmin", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const cars = await connection.execute(`SELECT * FROM kendaraan`);
    const orders = await connection.execute(`SELECT * FROM v_pesanan`);

    const result = {
      cars: cars.rows,
      orders: orders.rows,
    };

    res.json(result);
  } catch (err) {
    handleErrors(res, err, "Error fetching Dashboard Admin data");
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

// Route to fetch monthly sales data
// router.get("/monthlySales", async (req, res) => {
//   let connection;
//   try {
//     connection = await oracledb.getConnection();

//     const result = await connection.execute(
//       `SELECT TO_CHAR(TANGGAL_PEMBAYARAN, 'YYYY-MM') AS BULAN,
//        COUNT(ID_PEMBAYARAN) AS TOTAL_PESANAN,
//        SUM(JUMLAH_PEMBAYARAN) AS TOTAL_PEMBAYARAN
//       FROM PEMBAYARAN
//       GROUP BY TO_CHAR(TANGGAL_PEMBAYARAN, 'YYYY-MM')
//       ORDER BY TO_CHAR(TANGGAL_PEMBAYARAN, 'YYYY-MM')`
//     );

//     res.json(result);
//   } catch (err) {
//     handleErrors(res, err, "Error fetching monthly sales data");
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error("Error closing connection:", err);
//       }
//     }
//   }
// });

module.exports = router;
