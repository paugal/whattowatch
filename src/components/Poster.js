import '../style/App.css';
import '../style/Poster.css';
import React, { useState, useEffect} from 'react';
import defaultPoster from '../resources/defaultposter.png'
import axios from 'axios';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import MyButtonLink from './MyButtonLink';


function Poster({ id, name }) {
  const [movie, setMovie] = useState([]);
  const imgUrlM = "https://image.tmdb.org/t/p/w400/";

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
    <div className="posterContainer" key={id}>
    <a href={`/film/${movie.imdb_id}`}>
      {movie && (
        <img
          src={movie.poster_path ? imgUrlM + movie.poster_path : defaultPoster}
          alt={movie.title}
        />
      )}
      <div className="border-overlay">
        <div className='MoreInfo'>
          <div className='ButtonsBox'>
            <div className='ButtonsPoster'>
              <button>
                <FontAwesomeIcon icon={faHeart} style={{color: "#ffffff",}} />
              </button>
              <button>
                <FontAwesomeIcon icon={faClock} style={{color: "#ffffff",}}/>
              </button>
              <button>
                <FontAwesomeIcon icon={faEye} style={{color: "#ffffff",}} />
              </button>
            </div>
          </div>
          <div className='NotaPoster'> {Math.round(movie.vote_average* 10) / 10}</div>
        </div>
      </div>
    </a>
  </div>
  );
}

export default Poster;