import "./App.scss";
// import "swiper/swiper-bundle.min.css"; 
import "swiper/css";
import "swiper/css/autoplay"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BoxIconElement } from "boxicons";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Routers from "./config/Routers";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routers />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
