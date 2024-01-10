import '../style/App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PosterList from "./PosterList.js"


function SelectThree({ selectedMovieIds }) {
  
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';  // Reemplaza con tu propia clave de API de TMDb
        const promises = selectedMovieIds.map(async (movieId) => {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}&language=es&?api_key=${apiKey}`);
          return response.data;
        });

        const movies = await Promise.all(promises);
        setRecommendedMovies(movies);

        console.log('recommendedMovies:', recommendedMovies);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    // Verifica que haya IDs de películas antes de hacer la llamada a la API
    if (selectedMovieIds && selectedMovieIds.length > 0) {
      fetchMovies();
    }
  }, [selectedMovieIds]);

  return (
    <div className="contentContainer" id='home'>
        <h1>Peliculas parecidas que tal vez te gusten</h1>

        <div>
          <PosterList/>
        </div>
        <div className='botonesStart'>
        <button>Show More</button>
        </div>
    
    </div>
  );
}

export default SelectThree;
