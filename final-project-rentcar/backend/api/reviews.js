const express = require("express");
const oracledb = require("./../dbConfig");

const router = express.Router();

router.get("/reviews", async (req, res) => {
    let connection;
  
    try {
      connection = await oracledb.getConnection();
  
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

  module.exports = router;