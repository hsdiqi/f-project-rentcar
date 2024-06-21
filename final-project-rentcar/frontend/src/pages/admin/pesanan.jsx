import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/admin/navbar";

const Pemesan = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingID, setBookingID] = useState("");
  const [userID, setUserID] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [notelp, setNotelp] = useState("");
  const [datePick, setDatePick] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [statusBooking, setStatusBooking] = useState("");
  const [email, setEmail] = useState("");
  const [methodPayment, setMethodPayment] = useState("");
  const [datePayment, setDatePayment] = useState(null);

  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/listPesanan")
      .then((response) => {
        console.log("respon data: ", response.data);
        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
          console.log("respon data berupa array");
        } else {
          console.log("respon bukan array: ", response.data.bookings);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  useEffect(() => {
    if (selected) {
      setBookingID(selected.ID_PEMESANAN);
      setPaymentID(selected.id_pembayaran);
      setUserID(selected.id_pelanggan);
      const [firstName, ...lastNameParts] = selected.NAMA_PELANGGAN.split(" ");
      setNamaDepan(firstName);
      setNamaBelakang(lastNameParts.join(" "));
      setNotelp(selected.TELEPON_PELANGGAN);

      const formatDates = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      setDatePick(formatDates(selected.START_DATE));
      setReturnDate(formatDates(selected.END_DATE));
      setStatusBooking(selected.STATUS_PEMESANAN);
      setEmail(selected.EMAIL_PELANGGAN);
      setMethodPayment(selected.METODE_PEMBAYARAN);
      setDatePayment(selected.TANGGAL_PEMBAYARAN);
    }
  }, [selected]);

  const handlingDelete = (id) => {
    axios
      .post("http://localhost:3001/api/delBooking", { id })
      .then((response) => {
        if (response.status === 200) {
          alert("berhasil menghapus");
          setBookings(
            bookings.filter((booking) => booking.ID_PEMESANAN !== id)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  const handlingDetail = (id) => {
    const bookID = bookings.find((booking) => booking.ID_PEMESANAN === id);
    setSelected(bookID);
    setIsEditing(false);
  };

  const handlingUbah = (id) => {
    const bookID = bookings.find((booking) => booking.ID_PEMESANAN === id);
    setSelected(bookID);
    setIsEditing(true);
  };

  const handleSimpan = () => {
    const udateBookingData = {
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
    };

    axios
      .post("http://localhost:3001/api/updateBooking", udateBookingData)
      .then((response) => {
        if (response.status === 204) {
          alert("Data mobil berhasil diupdate");
          setIsEditing(false);
        }
      })
      .catch((error) => {
        console.error("Error updating pesanan:", error);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const isValidDateFormat = (dateString) => {
    // Regex untuk format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };
  
  // Contoh penggunaan
  // const date1 = '2024-06-22';
  console.log(isValidDateFormat(datePayment)); // Output: true
  // const date2 = '22-06-2024';
  console.log(isValidDateFormat(datePick)); // Output: false
  console.log(isValidDateFormat(returnDate)); // Output: false

  

  return (
    <div id="wrapper">
      <NavbarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="clearfix">
                  <div className="float-left">
                    <h1 className="h3 mb-4 text-gray-800">Pesanan</h1>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6"></div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <div className="card shadow">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Daftar Pesanan
                    </h6>
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama Pemesan</th>
                          <th>Tanggal pesan</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((pesanan, index) => (
                          <tr key={pesanan.ID_PEMESANAN}>
                            <td>{index + 1}</td>
                            <td>{pesanan.NAMA_PELANGGAN}</td>
                            <td>{formatDate(pesanan.TANGGAL_PEMESANAN)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() =>
                                  handlingUbah(pesanan.ID_PEMESANAN)
                                }
                              >
                                <i className="fa fa-pen"></i> Ubah
                              </button>
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() =>
                                  handlingDetail(pesanan.ID_PEMESANAN)
                                }
                              >
                                <i className="fa fa-eye"></i> Detail
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  if (window.confirm("apakah anda yakin?"))
                                    handlingDelete(pesanan.ID_PEMESANAN);
                                }}
                              >
                                <i className="fa fa-trash"></i> Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selected && (
            <div className="col-sm-8 m-5">
              <div className="card shadow">
                <div className="card-header">
                  <h6 className="m-0 font-weight-bold text-primary">
                    {isEditing ? "Rubah Data" : "Detail Kendaraan"}
                  </h6>
                </div>
                <div className="card-body">
                  {isEditing ? (
                    <div>
                      <div className="form-group">
                        <label htmlFor="nama">Nama Depan</label>
                        <input
                          type="text"
                          className="form-control"
                          value={namaDepan}
                          onChange={(e) => setNamaDepan(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nama">Nama Belakang</label>
                        <input
                          type="text"
                          className="form-control"
                          value={namaBelakang}
                          onChange={(e) => setNamaBelakang(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="warna">Tanggal Ambil</label>
                        <input
                          type="date"
                          className="form-control"
                          value={datePick}
                          onChange={(e) => setDatePick(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="jumlah_kursi">Tanggal Kembali</label>
                        <input
                          type="date"
                          className="form-control"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="no_polisi">Status pemesanan</label>
                        <input
                          type="text"
                          className="form-control"
                          value={statusBooking}
                          onChange={(e) => setStatusBooking(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tahun_beli">Nomor Telepon</label>
                        <input
                          type="number"
                          className="form-control"
                          value={notelp}
                          onChange={(e) => setNotelp(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="service">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="speed">Metode Pembayaran</label>
                        <input
                          type="text"
                          className="form-control"
                          value={methodPayment}
                          onChange={(e) => setMethodPayment(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="harga">Tanggal pembayaran</label>
                        <input
                          type="date"
                          className="form-control"
                          value={datePayment}
                          onChange={(e) => setDatePayment(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={handleSimpan}
                      >
                        Simpan
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4>Detail</h4>
                      <p>Nama: {selected.NAMA_PELANGGAN}</p>
                      <p>
                        Tanggal Pesan: {formatDate(selected.TANGGAL_PEMESANAN)}
                      </p>
                      <p>Nama Kendaraan: {selected.NAMA_KENDARAAN}</p>
                      <p>Total Bayar: Rp{selected.TOTAL_BAYAR}</p>
                      <p>Nomor Pelanggan: {selected.TELEPON_PELANGGAN}</p>
                      <p>Status pemesanan: {selected.STATUS_PEMESANAN}</p>
                      <p>Metode Pembayaran: {selected.METODE_PEMBAYARAN}</p>
                      <p>
                        Tanggal Pembayaran:{" "}
                        {formatDate(selected.TANGGAL_PEMBAYARAN)}
                      </p>
                      <p>
                        Tanggal Mulai Sewa: {formatDate(selected.START_DATE)}
                      </p>
                      <p>Tanggal Akhir Sewa: {formatDate(selected.END_DATE)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Pemesan;
