const express = require("express");
const oracledb = require("./../dbConfig");

const router = express.Router();

router.get("/mostbook", async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection();
  
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

  module.exports = router;