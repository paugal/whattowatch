import "../style/App.css";
import "../style/Poster.css";
import React, { useState, useEffect } from "react";
import defaultPoster from "../resources/defaultposter.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Poster({ id, name, isSeen, isFav, inWatchList }) {
  const [movie, setMovie] = useState([]);
  const [movieOMDb, setMovieOMDb] = useState([]);
  const imgUrlM = "https://image.tmdb.org/t/p/w400/";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "6bce84c9599883d5e4033758c40ab14f";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=es&api_key=${apiKey}`
        );

        if (response.data) {
          setMovie(response.data);
        } else {
          console.error("Error: Datos de película no encontrados.");
        }
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }

      try {
        const apiKey = "fb8928eb";
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${movie.imdb_id}&plot=full&apikey=${apiKey}`
        );

        if (response.data) {
          console.log(response.data);
          setMovieOMDb(response.data);
        } else {
          console.error("Error: Datos de OMDB no encontrados.");
        }
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleButtonFavClick = (e) => {
    e.stopPropagation();
  };
  const handleButtonWatchListClick = (e) => {
    e.stopPropagation();
  };
  const handleButtonSeenClick = (e) => {
    e.stopPropagation();
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
    const movieId = movie.imdb_id;
    /* window.location.href = `/film/${movieId}`; */
    navigate(`/film/${movieId}`);
  };

  return (
    <div className="posterContainer" key={id} onClick={handleContainerClick}>
      {movie && (
        <img
          src={movie.poster_path ? imgUrlM + movie.poster_path : defaultPoster}
          alt={movie.title}
        />
      )}
      <div className="border-overlay">
        <div className="MoreInfo">
          <div className="ButtonsBox">
            <div className="ButtonsPoster">
              <button onClick={handleButtonFavClick}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
              </button>
              <button onClick={handleButtonWatchListClick}>
                <FontAwesomeIcon icon={faClock} style={{ color: "#ffffff" }} />
              </button>
              <button onClick={handleButtonSeenClick}>
                <FontAwesomeIcon icon={faEye} style={{ color: "#ffffff" }} />
              </button>
            </div>
          </div>
          <div className="NotaPoster">
            {Math.round(movie.vote_average * 10) / 10}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poster;
