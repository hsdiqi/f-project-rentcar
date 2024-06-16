const express = require("express");
const oracledb = require("../../dbConfig");

const router = express.Router();

router.get("/mobil", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const carList = await connection.execute(`SELECT * FROM kendaraan`);

    const result = {
      cars: carList.rows,
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

router.post("/addCar", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();
    const {
      nameCar,
      tipe,
      color,
      capacity,
      nopol,
      thnBeli,
      foto, // Assume this is a base64 encoded string
      service,
      speed,
      harga,
    } = req.body;

    const status = "tersedia";

    const seqResult = await connection.execute(
      `SELECT id_kendaraan
          FROM (
            SELECT id_kendaraan
            FROM kendaraan
            ORDER BY id_kendaraan DESC
          )
          WHERE ROWNUM = 1`
    );

    const idResult = await connection.execute(
      `SELECT id_kategori FROM katalog_kendaraan
          WHERE tipe_kategori = :tipe`,
      { tipe }
    );
    const idKategori = idResult.rows[0].ID_KATEGORI;
    const lastId = seqResult.rows[0].ID_KENDARAAN;

    let seqValue;
    if (lastId != null) {
      seqValue = lastId + 1;
    } else {
      seqValue = 1;
    }
    console.log("SEQ value", seqValue);

    // Convert base64 string to Buffer
    const fotoBuffer = Buffer.from(foto, "base64");

    const result = await connection.execute(
      `INSERT INTO kendaraan 
              (id_kendaraan, nama_kendaraan, nopol, tipe_kendaraan, harga, status, katalog_kendaraan_id_kategori, foto_kendaraan, top_speed, last_service, cap_penumpang, warna, tahun_beli)
              VALUES(:idCar, :nameCar, :nopol, :tipe, :harga, :status, :idKategori, :foto, :speed, TO_DATE(:service, 'YYYY-MM-DD'), :capacity, :color, :thnBeli)`,
      {
        idCar: seqValue,
        nameCar,
        nopol,
        tipe,
        harga,
        status,
        idKategori,
        foto: fotoBuffer, // Use the Buffer here
        speed,
        service,
        capacity,
        color,
        thnBeli,
      },
      { autoCommit: true }
    );
    res.status(201).json({ message: "Car added successfully" });
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

router.post("/delCar", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const { id } = req.body;
    console.log("id request: ", id)

    const result = await connection.execute(
      `DELETE FROM kendaraan WHERE ID_KENDARAAN = :id`,
      { id },{autoCommit: true}
    );
    console.log("Deleted car with ID:", id, result);
    
    res.status(200).json({ message: "Car deleted successfully" });
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

router.put("/updateCar", async (req, res) => {
  const { id, nameCar, tipe, color, capacity, nopol, thnBeli, service, speed, harga, anyBook } = req.body;

  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      UPDATE kendaraan 
      SET NAMA_KENDARAAN = :nameCar, 
          TIPE_KENDARAAN = :tipe, 
          WARNA = :color, 
          CAP_PENUMPANG = :capacity, 
          NOPOL = :nopol, 
          TAHUN_BELI = :thnBeli, 
          last_service = TO_DATE(:service, 'YYYY-MM-DD'), 
          TOP_SPEED = :speed, 
          HARGA = :harga, 
          BANYAK_SEWA = :anyBook
      WHERE ID_KENDARAAN = :id
    `;

    const binds = {
      nameCar,
      tipe,
      color,
      capacity,
      nopol,
      thnBeli,
      service,
      speed,
      harga,
      anyBook,
      id
    };

    const options = {
      autoCommit: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT
    };

    const result = await connection.execute(sql, binds, options);

    console.log("Rows updated:", result.rowsAffected);

    res.sendStatus(204);
  } catch (err) {
    console.error("Error updating car:", err);
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


module.exports = router;
