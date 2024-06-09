// import Navbar from "./components/navbar";
import Home from "./components/home";
import HowItWorks from "./components/howItWork";
import MostBook from "./components/mostBook";
import Footer from "./components/footer";
import Reviews from "./components/review";

function MainPage() {
  return (
    <div className="main">
      {/* <Navbar /> */}
      <Home />
      <HowItWorks />
      <MostBook />
      <Reviews />
      <Footer />
    </div>
  );
}

export default MainPage;