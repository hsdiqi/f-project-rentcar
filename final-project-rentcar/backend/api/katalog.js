const express = require("express");
const oracledb = require("../dbConfig");

const router = express.Router();

router.post("/carlist", async (req, res) => {
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

  module.exports = router;