const express = require("express");
const oracledb = require("../../dbConfig");

const router = express.Router();

router.get("/listAkun", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const acountList = await connection.execute(
      `SELECT * FROM v_pelanggan_membership`
    );
    const result = {
      acounts: acountList.rows,
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

router.post("/updateAkun", async (req, res) => {
  let connection;

  const {
    userID,
    namaDepan,
    namaBelakang,
    nik,
    notelp,
    email,
    alamat,
    password,
    memberID,
    pointMember,
  } = req.body;

  try {
    connection = await oracledb.getConnection();

    const resultUpdate = await connection.execute(
      `UPDATE pelanggan
            SET nama_depan = :namaDepan,
            nama_belakang = :namaBelakang,
            nik = :nik,
            nomor_telepon = :notelp,
            email = :email,
            alamat = :alamat,
            password = :password,
            member_id_pelanggan = :memberID,
            point_membership = :pointMember
            WHERE id_pelanggan = :userID`,
      {
        namaDepan,
        namaBelakang,
        nik,
        notelp,
        email,
        alamat,
        password,
        memberID,
        pointMember,
        userID,
      },
      { autoCommit: true }
    );

    res.status(204);
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

router.post("/delAccount", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const { id } = req.body;

    const disabled = await connection.execute(
      `ALTER TABLE PEMESANAN DISABLE CONSTRAINT PEMESANAN_PELANGGAN_FK`
    //   ,{ autoCommit: true }
    );

    const result = await connection.execute(
      `DELETE FROM PELANGGAN WHERE ID_PELANGGAN = :id`,
      { id },
      { autoCommit: true }
    );

    const enabled = await connection.execute(
      `ALTER TABLE PEMESANAN ENABLE CONSTRAINT PEMESANAN_PELANGGAN_FK`
    //   ,{ ajdutoCommit: true }
    );

    if (result.rowsAffected && result.rowsAffected === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
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
