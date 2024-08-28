import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Details from "../pages/details/Details";
// import MovieGrid from "../components/movie-grid/MovieGrid";

const Routers = () => {
  return (
    <Routes>
      {/* Rute untuk pencarian */}
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      {/* Rute untuk detail */}
      <Route path="/:category/:id" element={<Details />} />
      {/* Rute untuk katalog */}
      <Route path="/:category" element={<Catalog />} />
      {/* Rute untuk beranda */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Routers;
