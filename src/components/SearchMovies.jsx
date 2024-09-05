import "../style/App.css";
import "../style/SearchMovies.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../resources/defaultposter.png";

function SearchMovies() {
  const { name } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  const imgUrlSmall = "https://image.tmdb.org/t/p/w200/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=6bce84c9599883d5e4033758c40ab14f&language=es&query=${name}`
        );
        setSearchResult(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function onlyYear(date) {
    if (date) {
      return "(" + date.slice(0, 4) + ")";
    } else {
      return "( Año Desconocido )";
    }
  }

  const selectMovie = (id) => {
    /*  window.location.href = `/film/${id}`; */
    navigate(`/film/${id}`);
  };

  return (
    <div>
      <h1 className="tituloBusqueda">Resultados de búsqueda para: {name}</h1>
      {searchResult.map((movie) => (
        <div
          className="dropdownItemSearchScreen"
          key={movie.id}
          onClick={() => selectMovie(movie.id)}
        >
          <img
            src={
              movie.poster_path
                ? imgUrlSmall + movie.poster_path
                : defaultPoster
            }
            alt={movie.title}
          />
          <div className="dropdownItemSearchText">
            <div className="filaNombrePelicula">{movie.title}</div>
            <div className="filaFechaPelicula">
              {onlyYear(movie.release_date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchMovies;
