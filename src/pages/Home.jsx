import React from "react";
import { Link } from "react-router-dom";

import HeroSlide from "../components/hero-slide/HeroSlide";
import { OutlineButton } from "../components/button/Button";
import "boxicons/css/boxicons.min.css";
import MovieList from "../components/movie-list/MovieList";

import { category, movieType, tvType } from "../api/tmdbApi";

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header movie-btn mb-2">
            <h2>Tranding Movies</h2>
            <Link to="/movie">
              <OutlineButton className="btn-small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header movie-btn mb-2">
            <h2>TopRated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="btn-small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header-btn btn-tv mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="btn-small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header-btn btn-tv mb-2">
            <h2>TopRated TV</h2>
            <Link to="/tv">
              <OutlineButton className="btn-small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Home;
