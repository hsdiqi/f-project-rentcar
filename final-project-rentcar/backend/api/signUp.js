const express = require("express");
const oracledb = require("../dbConfig");

const router = express.Router();

router.post("/signUp", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const { namaDepan, namaBelakang, nik, email, alamat, noTelp, password } =
      req.body;
    console.log(
      "nama depan: ",
      namaDepan,
      "nama belakang: ",
      namaBelakang,
      "nik: ",
      nik,
      "email: ",
      email,
      "notelp: ",
      noTelp,
      "pass: ",
      password
    );

    if (
      !namaDepan ||
      !namaBelakang ||
      !nik ||
      !email ||
      !alamat ||
      !noTelp ||
      !password
    ) {
      return res.status(400).json({
        message: "Semua kolom harus diisi",
        namaDepan: namaDepan,
        namaBelakang: namaBelakang,
        nik: nik,
        email: email,
        alamat: alamat,
        noTelp: noTelp,
        password: password,
      });
    }

    const userCheckResult = await connection.execute(
      `SELECT COUNT(*) AS user_count FROM pelanggan WHERE nik = :nik OR email = :email`,
      { nik, email }
    );

    const userCount = userCheckResult.rows[0].USER_COUNT; // Perbaiki penulisan nama kolom hasil query

    if (userCount > 0) {
      return res.status(409).json({ error: "NIK atau email sudah terdaftar" });
    }

    // const seqResult = await connection.execute(
    //   `SELECT id_pelanggan
    //     FROM (
    //       SELECT id_pelanggan
    //       FROM pelanggan
    //       ORDER BY id_pelanggan DESC
    //     )
    //     WHERE ROWNUM = 1`
    // );

    // const lastId = seqResult.rows[0].ID_PELANGGAN;

    // let seqValue;
    // if (lastId != null) {
    //   seqValue = lastId + 1;
    // } else {
    //   seqValue = lastId;
    // }
    // console.log("SEQ value", seqValue);

    const result = await connection.execute(
      `INSERT INTO pelanggan ( nama_depan, nama_belakang, nik, email, alamat, nomor_telepon, password)
         VALUES ( :nama_depan, :nama_belakang, :nik, :email, :alamat, :nomor_telepon, :password)`,
      {
        // id_pelanggan: seqValue,
        nama_depan: namaDepan,
        nama_belakang: namaBelakang,
        nik,
        email,
        alamat,
        nomor_telepon: noTelp,
        password,
      },
      { autoCommit: true }
    );
    res.status(201).json({ message: "User registered successfully", result });
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
