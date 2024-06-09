import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./main";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Navbar from "./components/navbar";
// import Reviews from './components/Review';
// import Review from './components/review'; // Pastikan nama file sesuai dengan casing yang diharapkan
// import MainPage from "./main";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <MainPage/> */}
        {/* <Route path="/" element={<MainPage />} /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/main" element={<MainPage />} /> */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
