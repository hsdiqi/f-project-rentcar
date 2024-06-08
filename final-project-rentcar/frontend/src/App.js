import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import HowItWorks from './components/howItWork';
import MostBook from './components/mostBook';
import Footer from './components/footer';
import Reviews from './components/review';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <HowItWorks/>
      <MostBook/>
      <Reviews/>
      <Footer/>
    </div>
  );
}

export default App;
