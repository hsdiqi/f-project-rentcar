import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/admin/navbar";

function ManajemenAkun() {
  const [accounts, setAccounts] = useState([]);
  const [userID, setUserID] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [alamat, setAlamat] = useState("");
  const [notelp, setNotelp] = useState("");
  const [email, setEmail] = useState("");
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [memberID, setMemberID] = useState("");
  const [pointMember, setPointMember] = useState("");
  const [jenisMember, setJenisMember] = useState("");

  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (selected) {
      setUserID(selected.ID_PELANGGAN);
      const [firstName, ...lastNameParts] = selected.NAMA_PELANGGAN.split(" ");
      setNamaDepan(firstName);
      setNamaBelakang(lastNameParts.join(" "));
      setNotelp(selected.NOMOR_TELEPON);
      setNik(selected.NIK);
      setMemberID(selected.MEMBER_ID_PELANGGAN);
      setPointMember(selected.POINT_MEMBERSHIP);
      setAlamat(selected.ALAMAT);
      setEmail(selected.EMAIL);
      setPassword(selected.PASSWORD);
      setJenisMember(selected.JENIS_MEMBERSHIP);
    }
  }, [selected]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data saat komponen dimount

  const fetchData = () => {
    axios
      .get("http://localhost:3001/api/listAkun")
      .then((response) => {
        console.log("respon data: ", response.data);
        if (Array.isArray(response.data.acounts)) {
          setAccounts(response.data.acounts);
          console.log("respon data berupa array");
        } else {
          console.log("respon bukan array: ", response.data.acounts);
        }
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  };

  const hapusHandling = (id) => {
    axios
      .post("http://localhost:3001/api/delAccount", { id })
      .then((response) => {
        if (response.status === 200) {
          alert("berhasil menghapus");
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const detailHandling = (id) => {
    const userID = accounts.find((acounts) => acounts.ID_PELANGGAN === id);
    setSelected(userID);
    setIsEditing(false);
  };

  const ubahHandling = (id) => {
    const userID = accounts.find((acounts) => acounts.ID_PELANGGAN === id);
    setSelected(userID);
    setIsEditing(true);
  };

  const handleSimpan = (id) => {
    if (jenisMember === "Regular") {
      setMemberID(1);
    } else if (jenisMember === "Bronze") {
      setMemberID(2);
    } else if (jenisMember === "Silver") {
      setMemberID(3);
    } else if (jenisMember === "Gold") {
      setMemberID(4);
    } else if (jenisMember === "Platinum") {
      setMemberID(5);
    } else {
      setMemberID(null);
    }

    const updateUserData = {
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
    };

    axios
      .post("http://localhost:3001/api/updateAkun", updateUserData)
      .then((response) => {
        if (response.status === 204) {
          alert("Data Pelanggan berhasil diupdate");
          setIsEditing(false);
        }
      })
      .catch((error) => {
        console.error("Error updating pesanan:", error);
      });
      fetchData();
  };

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
                    <h1 className="h3 mb-4 text-gray-800">
                      Manajemen Akun Pelanggan
                    </h1>
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
                      Daftar Akun
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
                          <th>Nama</th>
                          <th>Email</th>
                          <th>jenis Member</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.map((acounts, index) => (
                          <tr key={acounts.ID_PELANGGAN}>
                            <td>{index + 1}</td>
                            <td>{acounts.NAMA_PELANGGAN}</td>
                            <td>{acounts.EMAIL}</td>
                            <td>{acounts.JENIS_MEMBERSHIP}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-info me-3"
                                onClick={() =>
                                  ubahHandling(acounts.ID_PELANGGAN)
                                }
                              >
                                <i className="fa fa-eye"></i> Ubah
                              </button>
                              <button
                                className="btn btn-sm btn-warning me-3"
                                onClick={() =>
                                  detailHandling(acounts.ID_PELANGGAN)
                                }
                              >
                                <i className="fa fa-eye"></i> Detail
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  hapusHandling(acounts.ID_PELANGGAN)
                                }
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
                        <label htmlFor="warna">Alamat</label>
                        <input
                          type="text"
                          className="form-control"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="jumlah_kursi">Nomor Telepon</label>
                        <input
                          type="number"
                          className="form-control"
                          value={notelp}
                          onChange={(e) => setNotelp(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="no_polisi">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tahun_beli">NIK</label>
                        <input
                          type="number"
                          className="form-control"
                          value={nik}
                          onChange={(e) => setNik(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="service">Jenis Membership</label>
                        <input
                          type="text"
                          className="form-control"
                          value={jenisMember}
                          onChange={(e) => setJenisMember(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="speed">Point Membership</label>
                        <input
                          type="number"
                          className="form-control"
                          value={pointMember}
                          onChange={(e) => setPointMember(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="harga">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                      <p>NIK: {selected.NIK}</p>
                      <p>Nomor Telepon: {selected.NOMOR_TELEPON}</p>
                      <p>Email: {selected.EMAIL}</p>
                      <p>Alamat: {selected.ALAMAT}</p>
                      <p>Jenis Membership: {selected.JENIS_MEMBERSHIP}</p>
                      <p>Point Membership: {selected.POINT_MEMBERSHIP}</p>
                      <p>
                        Password:{" "}
                        {showPassword ? selected.PASSWORD : "********"}
                      </p>
                      <label>
                        <input
                          type="checkbox"
                          onChange={togglePasswordVisibility}
                        />{" "}
                        Tampilkan Kata Sandi
                      </label>
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
}

export default ManajemenAkun;
