import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SearchBar from './SearchBar';
import Recomendations from './Recomendations';
import '../style/SelectThree.css';
import '../style/Recomendations.css';
import '../style/Boton.css';

function SelectThree({ updateSelectedMovies }) {
  const [selectedMoviesId, setSelectedMoviesId] = useState([]);
  const [recomendationsVisible, setRecomendationsVisible] = useState(false);
  

  const handleSearch = () => {
    const nonEmptyTitles = selectedMoviesId.filter(id => typeof id === 'number');
    console.log('Títulos seleccionados:', nonEmptyTitles);
    updateSelectedMovies(nonEmptyTitles);
    setRecomendationsVisible(true);
  };

  const handleReset = () => {
    setSelectedMoviesId([]);
    setRecomendationsVisible(false);
  };

  const handleUpdateMovie = (index, movie) => {
    setSelectedMoviesId(prevMovies => {
      const newMovies = [...prevMovies];
      newMovies[index] = movie;
      return newMovies;
    });
    setRecomendationsVisible(false);
  };

  return (
    <div>
      <div className="contentContainer" id="home">
        <h1>Dinos qué te gusta y te recomendaremos películas</h1>
        {[0, 1, 2].map(index => (
          <SearchBar
            key={index}
            updateSelectedMovie={movie => handleUpdateMovie(index, movie)}
          />
        ))}
        <div className="botonesStart">
          <button className="Boton" variant="contained" onClick={handleSearch}>
            Buscar
          </button>
          <button className="Boton" variant="contained" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {recomendationsVisible && selectedMoviesId.length > 0 && (
        <Recomendations selectedMovieIds={selectedMoviesId} />
      )}
    </div>
  );
}

export default SelectThree;
