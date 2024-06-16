import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/admin/navbar";
import axios from "axios";

function Mobil() {
  const [cars, setCars] = useState([]);
  const [nameCar, setNameCar] = useState("");
  const [color, setColor] = useState("");
  const [tipe, setTipe] = useState("");
  const [capacity, setCapacity] = useState("");
  const [nopol, setNopol] = useState("");
  const [thnBeli, setThnBeli] = useState("");
  const [foto, setFoto] = useState(null);
  const [service, setService] = useState("");
  const [speed, setSpeed] = useState("");
  const [harga, setHarga] = useState("");
  const [anyBook, setAnyBook] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/mobil")
      .then((response) => {
        console.log("respon data: ", response.data);
        if (Array.isArray(response.data.cars)) {
          setCars(response.data.cars);
          console.log("respon data berupa array");
        } else {
          console.log("respon bukan array: ", response.data.cars);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const handlingUbah = (id) => {
    const selected = cars.find((car) => car.ID_KENDARAAN === id);
    setSelectedCar(selected);
    setIsEditing(true);
  };

  const handlingDetail = (id) => {
    const selected = cars.find((car) => car.ID_KENDARAAN === id);
    setSelectedCar(selected);
    setIsEditing(false);
  };

  const handlingHapus = (id) => {
    axios
      .post("http://localhost:3001/api/delCar", { id })
      .then((response) => {
        if (response.status === 200) {
          alert("berhasil menghapus");
          setCars(cars.filter((car) => car.ID_KENDARAAN !== id));
        }
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  const addHandling = (event) => {
    event.preventDefault();

    const carData = {
      nameCar,
      tipe,
      color,
      capacity,
      nopol,
      thnBeli,
      foto,
      service,
      speed,
      harga,
    };

    axios
      .post("http://localhost:3001/api/addCar", carData)
      .then((response) => {
        console.log("sukses");
        if (response.status === 201) {
          alert("sukses");
          clearForm();
          setCars([...cars, response.data.car]); // Assuming response.data.car contains the newly added car
        }
        // Lakukan apa pun setelah berhasil
      })
      .catch((err) => {
        console.log("server bermasalah");
        console.error(err);
      });
  };

  const clearForm = () => {
    setNameCar("");
    setColor("");
    setCapacity("");
    setNopol("");
    setThnBeli("");
    setFoto(null);
    setService("");
    setSpeed("");
    setHarga("");
  };

  const handleSimpan = () => {
    console.log("simpan clicked")
    const updatedCarData = {
      id: selectedCar.ID_KENDARAAN,
      nameCar: selectedCar.NAMA_KENDARAAN,
      tipe: selectedCar.TIPE_KENDARAAN,
      color: selectedCar.WARNA,
      capacity: selectedCar.CAP_PENUMPANG,
      nopol: selectedCar.NOPOL,
      thnBeli: selectedCar.TAHUN_BELI,
      service: selectedCar.TERAKHIR_SERVICE,
      speed: selectedCar.TOP_SPEED,
      harga: selectedCar.HARGA,
      anyBook: parseInt(anyBook), // Convert anyBook to integer
    };

    axios
      .put(`http://localhost:3001/api/updateCar`, updatedCarData)
      .then((response) => {
        if (response.status === 204) {
          alert("Data mobil berhasil diupdate");
          // setCars(
          //   cars.map((car) =>
          //     car.ID_KENDARAAN === selectedCar.ID_KENDARAAN
          //       ? { ...car, ...updatedCarData }
          //       : car
          //   )
          // );
          setIsEditing(false);
        }
      })
      .catch((error) => {
        console.error("Error updating car:", error);
      });
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
                    <h1 className="h3 mb-4 text-gray-800">Data Mobil</h1>
                  </div>
                  <div className="float-right">
                    <a
                      href="/tambahDataMobil"
                      className="btn btn-sm btn-primary"
                    >
                      <i className="fa fa-plus"></i> Tambah Data
                    </a>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6"></div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="card shadow">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Tambah Data
                    </h6>
                  </div>
                  <div className="card-body">
                    <form method="POST" encType="multipart/form-data">
                      <div className="form-group">
                        <label htmlFor="merk">Nama Merk</label>
                        <select
                          name="id_merk"
                          id="merk"
                          className="form-control"
                          value={tipe}
                          onChange={(e) => setTipe(e.target.value)}
                        >
                          {cars.map((car, index) => (
                            <option key={index} value={car.TIPE_KENDARAAN}>
                              {car.TIPE_KENDARAAN}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="nama">Nama Mobil</label>
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          required
                          placeholder="ketik"
                          autoComplete="off"
                          className="form-control"
                          value={nameCar}
                          onChange={(e) => setNameCar(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="form-group col-6">
                          <label htmlFor="warna">Warna Mobil</label>
                          <input
                            type="text"
                            name="warna"
                            id="warna"
                            required
                            placeholder="ketik"
                            autoComplete="off"
                            className="form-control"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="jumlah_kursi">Jumlah Kursi</label>
                          <input
                            type="number"
                            name="jumlah_kursi"
                            id="jumlah_kursi"
                            required
                            placeholder="ketik"
                            autoComplete="off"
                            className="form-control"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-6">
                          <label htmlFor="no_polisi">No Polisi</label>
                          <input
                            type="text"
                            name="no_polisi"
                            id="no_polisi"
                            required
                            placeholder="ketik"
                            autoComplete="off"
                            className="form-control"
                            value={nopol}
                            onChange={(e) => setNopol(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="tahun_beli">Tahun Beli</label>
                          <input
                            type="number"
                            name="tahun_beli"
                            id="tahun_beli"
                            required
                            placeholder="ketik"
                            autoComplete="off"
                            className="form-control"
                            value={thnBeli}
                            onChange={(e) => setThnBeli(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="service">Terakhir Service</label>
                          <input
                            type="date"
                            name="service"
                            id="service"
                            required
                            className="form-control"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="speed">Max Speed</label>
                          <input
                            type="number"
                            name="speed"
                            id="speed"
                            required
                            placeholder="ketik"
                            autoComplete="off"
                            className="form-control"
                            value={speed}
                            onChange={(e) => setSpeed(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="harga">Harga</label>
                          <input
                            type="number"
                            name="harga"
                            id="harga"
                            required
                            placeholder="ketik"
                            autoComplete="off"
                            className="form-control"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="gambar">Gambar Mobil</label>
                        <input
                          type="file"
                          name="gambar"
                          id="gambar"
                          required
                          className="form-control-file"
                          onChange={(e) => setFoto(e.target.files[0])}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          className="btn btn-sm btn-success"
                          style={{ marginRight: "10px" }}
                          onClick={addHandling}
                        >
                          Tambah
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={clearForm}
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-sm-8">
                <div className="card shadow">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Daftar Mobil
                    </h6>
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      cellSpacing="0"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Mobil</th>
                          <th>Tipe</th>
                          <th>Kursi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map((car, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{car.NAMA_KENDARAAN}</td>
                            <td>{car.TIPE_KENDARAAN}</td>
                            <td>{car.CAP_PENUMPANG}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-info me-3"
                                onClick={() => handlingUbah(car.ID_KENDARAAN)}
                              >
                                <i className="fa fa-pen"></i> Ubah
                              </button>
                              <button
                                className="btn btn-sm btn-warning me-3"
                                onClick={() => handlingDetail(car.ID_KENDARAAN)}
                              >
                                <i className="fa fa-eye"></i> Detail
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handlingHapus(car.ID_KENDARAAN)}
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

          {selectedCar && (
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
                      {/* Form Edit */}
                      <div className="form-group">
                        <label htmlFor="nama">Nama Mobil</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedCar.NAMA_KENDARAAN}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              NAMA_KENDARAAN: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="warna">Warna Mobil</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedCar.WARNA}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              WARNA: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="jumlah_kursi">Jumlah Kursi</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedCar.CAP_PENUMPANG}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              CAP_PENUMPANG: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="no_polisi">No Polisi</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedCar.NOPOL}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              NOPOL: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tahun_beli">Tahun Beli</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedCar.TAHUN_BELI}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              TAHUN_BELI: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="service">Terakhir Service</label>
                        <input
                          type="date"
                          className="form-control"
                          value={selectedCar.TERAKHIR_SERVICE}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              TERAKHIR_SERVICE: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="speed">Max Speed</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedCar.TOP_SPEED}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              TOP_SPEED: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="harga">Harga</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedCar.HARGA}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              HARGA: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="banyak_sewa">Banyak Sewa</label>
                        <input
                          type="number"
                          className="form-control"
                          value={anyBook}
                          onChange={(e) =>
                            setAnyBook(parseInt(e.target.value))
                          }
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
                      {/* Detail */}
                      <h5>{selectedCar.NAMA_KENDARAAN}</h5>
                      <p>Status: {selectedCar.STATUS}</p>
                      <p>Tipe: {selectedCar.TIPE_KENDARAAN}</p>
                      <p>Warna: {selectedCar.WARNA}</p>
                      <p>Jumlah Kursi: {selectedCar.CAP_PENUMPANG}</p>
                      <p>Top Speed: {selectedCar.TOP_SPEED}</p>
                      <p>Harga: {selectedCar.HARGA}</p>
                      <p>No Polisi: {selectedCar.NOPOL}</p>
                      <p>Banyak Sewa: {selectedCar.BANYAK_SEWA}</p>
                      <p>Terakhir Service: {selectedCar.TERAKHIR_SERVICE}</p>
                      <p>Tahun Beli: {selectedCar.TAHUN_BELI}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mobil;
