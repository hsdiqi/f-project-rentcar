import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Catalog from "./pages/catalog";
import BookingPage from "./pages/booking";
import LoginAdmin from "./pages/admin/loginAdmin";
import DashboardAdmin from "./pages/admin/dashboard";
import Mobil from "./pages/admin/mobil";
import Pesanan from "./pages/admin/pesanan";


function App() {
  // useEffect(() => {
  //   const handleUnload = () => {
  //     // Hapus akses token dari penyimpanan lokal saat pengguna meninggalkan situs
  //     localStorage.removeItem("accessToken");
  //   };

  //   // Tambahkan event listener untuk menangani saat pengguna menutup atau meninggalkan situs
  //   window.addEventListener("beforeunload", handleUnload);

  //   // Pastikan untuk membersihkan event listener saat komponen dibongkar
  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/bookingPage" element={<BookingPage />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/mobil" element = {<Mobil/>}/>
          <Route path="/pesanan" element={<Pesanan/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
