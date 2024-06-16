import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/admin/navbar";
// import { Bar } from "react-chartjs-2";

function DashboardAdmin() {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [monthlyData, setMonthlyData] = useState({
  //   labels: [],
  //   datasets: [],
  // });
  // const chartRef = useRef(null); // Referensi untuk elemen canvas

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/dashboardAdmin"
      );
      if (
        Array.isArray(response.data.cars) &&
        Array.isArray(response.data.orders)
      ) {
        setCars(response.data.cars);
        setOrders(response.data.orders);
      } else {
        console.log("Data response bukan array: ", response.data);
      }

      // const monthlySalesResponse = await axios.get(
      //   "http://localhost:3001/api/monthlySales"
      // );
      // const monthlySalesData = monthlySalesResponse.data;

      // const labels = monthlySalesData.map((entry) => entry.BULAN);
      // const totalPesanan = monthlySalesData.map((entry) => entry.TOTAL_PESANAN);
      // const totalPembayaran = monthlySalesData.map(
      //   (entry) => entry.TOTAL_PEMBAYARAN
      // );

      // setMonthlyData({
      //   labels: labels,
      //   datasets: [
      //     {
      //       label: "Total Pesanan",
      //       backgroundColor: "rgba(75,192,192,0.2)",
      //       borderColor: "rgba(75,192,192,1)",
      //       borderWidth: 1,
      //       hoverBackgroundColor: "rgba(75,192,192,0.4)",
      //       hoverBorderColor: "rgba(75,192,192,1)",
      //       data: totalPesanan,
      //     },
      //     {
      //       label: "Total Pembayaran",
      //       backgroundColor: "rgba(255,99,132,0.2)",
      //       borderColor: "rgba(255,99,132,1)",
      //       borderWidth: 1,
      //       hoverBackgroundColor: "rgba(255,99,132,0.4)",
      //       hoverBorderColor: "rgba(255,99,132,1)",
      //       data: totalPembayaran,
      //     },
      //   ],
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   if (chartRef && chartRef.current) {
  //     chartRef.current.chartInstance.destroy(); // Hancurkan instansi chart sebelumnya
  //   }
  //   renderChart();
  // }, [monthlyData]); // Render ulang chart ketika monthlyData berubah

  // const renderChart = () => {
  //   if (chartRef && chartRef.current && monthlyData.labels.length > 0) {
  //     const chartInstance = chartRef.current.chartInstance;
  //     chartInstance.update(); // Update chartInstance yang sudah ada
  //   }
  // };

  return (
    <div id="wrapper">
      <NavbarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Dashboard ADMIN</h1>
            <hr />
            <div className="row">
              {/* Kartu Data Mobil */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div
                    className="card-body"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Data Mobil
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <div className="list-group">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    style={{
                                      position: "sticky",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    Nama Kendaraan
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      position: "sticky",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    Nomor Polisi
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      position: "sticky",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    Status{" "}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {cars.map((car, index) => (
                                  <tr key={index}>
                                    <td>{car.NAMA_KENDARAAN}</td>
                                    <td>{car.NOPOL}</td>
                                    <td>{car.STATUS}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-car fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kartu Data Pesanan */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div
                    className="card-body"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Data Pesanan
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <div className="list-group">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    style={{
                                      position: "sticky",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    Nama Pelanggan
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      position: "sticky",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    ID Pesanan
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      position: "sticky",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    Status{" "}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((order, index) => (
                                  <tr key={index}>
                                    <td>{order.NAMA_LENGKAP}</td>
                                    <td>{order.ID_PESANAN}</td>
                                    <td>{order.STATUS_PEMESANAN}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-user fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kartu Data Bulanan */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Data Bulanan
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              {/* <canvas>
                                <Bar
                                  ref={chartRef}
                                  data={monthlyData}
                                  options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                      y: {
                                        type: "linear",
                                        beginAtZero: true,
                                      },
                                    },
                                  }}
                                />
                              </canvas> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-receipt fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kartu Data Lainnya */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Data Lainnya
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          Placeholder
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-users fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Akun yang Sedang Login */}
            <div className="row">
              <div className="col-md-8">
                <div className="card shadow">
                  <div className="card-header">
                    <strong>Akun yang Sedang Login</strong>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-9">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td style={{ lineHeight: "2" }}>Nama</td>
                              <td>:</td>
                              <td>
                                <b>Hasbi</b>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ lineHeight: "2" }}>ID Karyawan</td>
                              <td>:</td>
                              <td>
                                <b>01</b>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ lineHeight: "2" }}>Email</td>
                              <td>:</td>
                              <td>
                                <b>hasbi@gmail.com</b>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ lineHeight: "2" }}>Jabatan</td>
                              <td>:</td>
                              <td>
                                <b>Raja Iblis</b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
