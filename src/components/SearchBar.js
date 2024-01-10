import '../style/SearchBar.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMovie, removeMovie } from '../features/movies/movieSlide';
import axios from 'axios';

const SearchBar = ({updateSelectedMovie, index}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showList, setShowList] = useState(false);

  //para el tamaño original cambiamos w200 por "original"
  const imgUrlSmall = "https://image.tmdb.org/t/p/w200/"

  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const handleAddMovie = (movie) => {
    dispatch(addMovie(movie));
  };

  const handleRemoveMovie = (movieId) => {
    dispatch(removeMovie(movieId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=6bce84c9599883d5e4033758c40ab14f&language=es&query=${query}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     // Evitar realizar solicitudes innecesarias (por ejemplo, al iniciar la página)
     if (query.trim() !== '' && showList) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [query, showList]);

  const handleSelection = (selectedMovie) => {
    // Lógica para manejar la selección
    console.log('Película seleccionada:', selectedMovie);
    setSelectedMovie({
      id: selectedMovie.id,
      title: selectedMovie.title
    });
    setQuery(selectedMovie.title); // Establecer el título de la película en el input
    setResults([]); // Ocultar la lista de resultados
    setShowList(false);

    if (updateSelectedMovie) {
      updateSelectedMovie(selectedMovie.id);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Mostrar la lista de resultados siempre que el valor del input se modifique
    setShowList(true);
    // Mostrar la lista de resultados solo si hay una búsqueda válida
    setResults(inputValue.trim() !== '' ? [] : []);
  };

  function onlyYear(date){
    date = "(" + date.slice(0, 4) + ")";

    return date
  }

  return (
    <div className='BOX'>
      <input
        className='inputStartPage'
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar películas..."
      />
      {showList && results.length > 0 && (
        <div className="dropdownFilmSearch">
          {results.map((movie) => (
            <div 
              className="dropdownItemSearch"
              key={movie.id}
              onClick={() => handleSelection(movie)}
            >
              <img src={imgUrlSmall + movie.poster_path} alt={movie.title}/>
              <div className="dropdownItemSearchText">
                <div className='filaNombrePelicula'>
                  {movie.title} 
                </div>
                <div className='filaFechaPelicula'>
                  {onlyYear(movie.release_date)}
                </div>
              </div>
             

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

