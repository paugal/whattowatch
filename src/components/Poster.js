import '../style/App.css';
import '../style/Poster.css';
import React, { useState, useEffect} from 'react';
import defaultPoster from '../resources/defaultposter.png'
import axios from 'axios';


function Poster({ id, name }) {
  const [movie, setMovie] = useState([]);
  const imgUrlM = "https://image.tmdb.org/t/p/w300/";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=es&api_key=${apiKey}`);
        console.log('RESPONSE:');
  
        if (response.data) {
          setMovie(response.data);
          console.log('POSTER:', response.data);
        } else {
          console.error('Error: Datos de película no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };
  
    // Se ejecuta solo al montar el componente
    fetchMovies();
  }, []);  // Arreglo de dependencia vacío
  
  // Resto del código...
  

  useEffect(() => {
    // Agrega un console.log aquí para verificar si este useEffect se ejecuta
    console.log('UseEffect with movie:', movie);
  }, [movie]);


  return (
    <iv className="posterContainer" key={id}>
      
      {movie && (
        <img
          src={movie.poster_path ? imgUrlM + movie.poster_path : defaultPoster}
          alt={movie.title}
        />
      )}
      <div>{name}</div>
    </iv>
  );
}

export default Poster;