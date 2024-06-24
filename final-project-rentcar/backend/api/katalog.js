const express = require("express");
const oracledb = require("../dbConfig");

const router = express.Router();
router.get("/category", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const kategori = await connection.execute(
      `SELECT tipe_kategori FROM katalog_kendaraan`
    );

    const result = { categories: kategori.rows };
    // console.log(result);

    res.json(result);
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

router.post("/carlist", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const { sortBy, carCategory, tipeList } = req.body;
    console.log(sortBy, carCategory, tipeList);

    let showByClause = "";
    if (tipeList === "Tersedia") {
      showByClause = "AND status = 'Tersedia'";
    } else if (tipeList === "Tidak Tersedia") {
      showByClause = "AND status = 'Tidak Tersedia'";
    } else {
      showByClause = " ";
    }

    let orderByClause = "";
    if (sortBy === "lPrice") {
      orderByClause = "ORDER BY HARGA ASC";
    } else if (sortBy === "hPrice") {
      orderByClause = "ORDER BY HARGA DESC";
    }

    let query = `
      SELECT * 
      FROM v_list_car_katalog
      WHERE TIPE_KENDARAAN = :carCategory ${showByClause}
      ${orderByClause}
    `;

    const result = await connection.execute(query, { carCategory });

    const listResult = {
      cars: result.rows,
    };

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
