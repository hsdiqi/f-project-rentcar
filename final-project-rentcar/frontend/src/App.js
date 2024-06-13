import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
import MainPage from "./pages/main";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
// import Navbar from "./components/navbar";
import Catalog from "./pages/catalog";
import BookingPage from "./pages/booking";
import LoginAdmin from "./pages/admin/loginAdmin";
import DashboardAdmin from "./pages/admin/dashboard";

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
        {/* <Navbar /> */}
        {/* <MainPage/> */}
        {/* <Route path="/" element={<MainPage />} /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/bookingPage" element={<BookingPage />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
