import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi from "../../api/tmdbApi";
import { category as tmdbCategory, movieType, tvType } from "../../api/tmdbApi";
import { OutlineButton } from "../button/Button";
import { Input } from "../input/Input";
import Button from "../button/Button";


const MovieGrid = props => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword, category: routeCategory } = useParams();
  // console.log("MovieGrid props.category:", props.category);

  useEffect(() => {
    // console.log("Route Category:", routeCategory);
    // console.log("Props Category:", props.category);

    // Validasi kategori dari useParams
    if (!tmdbCategory[routeCategory]) {
      console.error("Invalid category from useParams:", routeCategory);
      return;
    }
    const getList = async () => {
      if (!tmdbCategory[routeCategory]) {
        console.error("Invalid category from useParams:", routeCategory);
        return;
      }
      let response = null;

      try {
        if (keyword === undefined) {
          const params = {};
          // console.log("Params sent:", params);

          switch (routeCategory) {
            case tmdbCategory.movie:
              response = await tmdbApi.getMoviesList(movieType.upcoming, {
                params,
              });
              break;
            case tmdbCategory.tv:
              response = await tmdbApi.getTvList(tvType.popular, { params });
              break;
            default:
              console.error("Category not found");
              break;
          }
        } else {
          const params = {
            query: keyword,
          };
          response = await tmdbApi.search(routeCategory, { params });
        }
        // console.log("API Response:", response);
        if (response && response.results) {
          setItems(response.results);
          setTotalPage(response.total_pages);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getList();
  }, [props.category, keyword, routeCategory]);

  const loadMore = async () => {
    let response = null;

    try {
      if (keyword === undefined) {
        const params = {
          page: page + 1,
        };
        switch (routeCategory) {
          case tmdbCategory.movie:
            console.log("Fetching upcoming movies...");
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          case tmdbCategory.tv:
            console.log("Fetching popular TV shows...");
            response = await tmdbApi.getTvList(tvType.popular, { params });
            break;
          default:
            console.error("Category not found");
            break;
        }
      } else {
        const params = {
          page: page + 1,
          query: keyword,
        };
        response = await tmdbApi.search(routeCategory, { params });
        console.log("API Response for search:", response);
      }
      // console.log("API Response:", response);
      if (response && response.results) {
        setItems([...items, ...response.results]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    }
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={routeCategory} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="btn-small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = ({ category, keyword }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState(keyword || "");
  // console.log("MovieSearch category:", category);
  // console.log("MovieSearch keyword:", keyword);

  const goToSearch = useCallback(() => {
    if (searchKeyword.trim().length > 0) {
      const searchCategory = tmdbCategory[category];
      if (searchCategory) {
        navigate(`/${searchCategory}/search/${searchKeyword}`);
      } else {
        console.error("Invalid category in MovieSearch:", category);
      }
    }
  }, [searchKeyword, category, navigate]);

  useEffect(() => {
    const enterEvent = e => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [searchKeyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter Keyword"
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      <Button className='btn-small' onClick={goToSearch}>Search</Button>
    </div>
  );
};

// const MovieSearch = ({ category, props, keyword }) => {
//   const navigate = useNavigate();
//   const [searchKeyword, setKSearchKeyword] = useState(
//     props.keyword ? props.keyword : ""
//   );
//   console.log("ini pppopp", props);
//   const goToSearch = useCallback(() => {
//     if (searchKeyword.trim().length > 0) {
//       const searchCategory = tmdbCategory[category];
//       navigate(`/${searchCategory}/search/${keyword}`);
//     } else {
//       console.error("Invalid category in MovieSearch:", category);
//     }
//   }, [searchKeyword, category, navigate]);

//   useEffect(() => {
//     const enterEvent = e => {
//       e.preventDefault();
//       if (e.keyCode === 13) {
//         goToSearch();
//       }
//     };
//     document.addEventListener("keyup", enterEvent);
//     return () => {
//       document.removeEventListener("keyup", enterEvent);
//     };
//   }, [keyword, goToSearch]);

//   return (
//     <div className="movie-search">
//       <Input
//         type="text"
//         placeholder="Enter Keyword"
//         value={keyword}
//         onChange={e => setKSearchKeyword(e.target.value)}
//       />
//     </div>
//   );
// };

export default MovieGrid;
