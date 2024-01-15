import '../style/App.css';
import '../style/SelectThree.css';
import SearchBar from './SearchBar';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function SelectThree({ updateSelectedMovies }) {

  const [selectedMovies, setSelectedMovies] = useState(Array(3).fill(''));

  const handleSearch = () => {
    // Filtrar solo las películas no vacías
    const nonEmptyTitles = selectedMovies
      .filter(id => typeof id === 'number');
    
    console.log('Títulos seleccionados:', nonEmptyTitles);
    updateSelectedMovies(nonEmptyTitles);
  };

  const handleReset = () => {
    // Lógica para resetear o reiniciar el estado si es necesario
    setSelectedMovies(Array(3).fill(''));
  };

  return (
<div className="contentContainer" id='home'>
      <h1>Dinos que te gusta y te recomendaremos peliculas!</h1>
      
      <SearchBar updateSelectedMovie={(movie) => {
        const newSelectedMovies = [...selectedMovies];
        newSelectedMovies[0] = movie;
        setSelectedMovies(newSelectedMovies);
      }} />

      <SearchBar updateSelectedMovie={(movie) => {
        const newSelectedMovies = [...selectedMovies];
        newSelectedMovies[1] = movie;
        setSelectedMovies(newSelectedMovies);
      }} />

      <SearchBar updateSelectedMovie={(movie) => {
        const newSelectedMovies = [...selectedMovies];
        newSelectedMovies[2] = movie;
        setSelectedMovies(newSelectedMovies);
      }} />

      <div className='botonesStart'>
        <Button className='BotonBuscar' variant="contained" onClick={handleSearch}>Buscar</Button>
      </div>
    </div>
  );
}

export default SelectThree;