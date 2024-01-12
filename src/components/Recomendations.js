import '../style/App.css';
import '../style/Recomendations.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poster from "./Poster.js"


function Recomendations({ selectedMovieIds }) {
  
  const [selectedMovies, setselectedMovies] = useState([]);
  const [commonGenres, setCommonGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [recomFinalList, setRecomFinalList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';  // Reemplaza con tu propia clave de API de TMDb
        const promises = selectedMovieIds.map(async (movieId) => {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}&language=es&?api_key=${apiKey}`);
          return response.data;
        });

        const movies = await Promise.all(promises);
        setselectedMovies(movies);

        console.log('selectedMovies:', selectedMovies);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    // Verifica que haya IDs de películas antes de hacer la llamada a la API
    if (selectedMovieIds && selectedMovieIds.length > 0) {
      fetchMovies();
    }
  }, [selectedMovieIds]);

  useEffect(() => {
    const fetchRecomentdations = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const promises = selectedMovieIds.map(async (movieId) => {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=es&api_key=${apiKey}`);
          return response.data;
        });

        const recomendations = await Promise.all(promises);
        setRecomendations(recomendations);
        console.log('Recomended Movies:', recomendations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedMovieIds && selectedMovieIds.length > 0) {
      fetchRecomentdations();
    }

  }, [selectedMovieIds]);

  useEffect(() => {
    const finalList = [];

    for (const recommendationsArray of recomendations) {
      for (const recommendationItem of recommendationsArray.results) {
        finalList.push(recommendationItem);
      }
    }

    setRecomFinalList(finalList);
  }, [recomendations]);

  useEffect(() => {
    // Extrae todos los géneros de las películas
    const genresArray = selectedMovies.flatMap(movie => movie.genres.map(genre => genre.name));

    // Cuenta la frecuencia de cada género
    const genreCounts = genresArray.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});

    // Ordena los géneros según la frecuencia
    const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

    setAllGenres(sortedGenres);

    // Filtra los géneros que aparecen más de una vez
    const commonGenresArray = sortedGenres.filter(genre => genreCounts[genre] > 1);
    setCommonGenres(commonGenresArray);
  }, [selectedMovies]);

  return (
    <div className="contentContainer" id='home'>
        <h1>Peliculas parecidas que tal vez te gusten</h1>
        <div className='botonesStart'>
        </div>
        <div className='recomendationBox'>
          {recomFinalList.map((movie) => (
            <Poster key={movie.id} id={movie.id} name={movie.title} />
          ))}
        </div>
    </div>
  );
}

export default Recomendations;
