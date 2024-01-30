import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Recomendations from './Recomendations';
import '../style/SelectThree.css';
import '../style/Recomendations.css';
import '../style/Boton.css';
import { useMovieContext  } from './contextos/MovieContext';

function SelectThree({ updateSelectedMovies: propUpdateSelectedMovies }) {

  const { selectedMovies, updateSelectedMovies } = useMovieContext();
  const [selectedMoviesId, setSelectedMoviesId] = useState([]);
  const [recomendationsVisible, setRecomendationsVisible] = useState(false);


  useEffect(() => {
    const storedMovies = sessionStorage.getItem('selectedMovies');
    if (storedMovies) {
      setSelectedMoviesId(JSON.parse(storedMovies));
      setRecomendationsVisible(true);
    }

    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);


  const handleSearch = () => {
    const nonEmptyTitles = selectedMoviesId.filter(id => typeof id === 'number');
    console.log('Títulos seleccionados:', nonEmptyTitles);
    propUpdateSelectedMovies(nonEmptyTitles);
    setRecomendationsVisible(true);

    sessionStorage.setItem('selectedMovies', JSON.stringify(selectedMoviesId));
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());

  };

  const handleReset = () => {
    setSelectedMoviesId([]);
    setRecomendationsVisible(false);
    sessionStorage.removeItem('selectedMovies');
    sessionStorage.removeItem('scrollPosition');
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
