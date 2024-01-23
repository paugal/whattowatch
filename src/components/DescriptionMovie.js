import '../style/App.css';
import '../style/DescriptionMovie.css'
import React from 'react';
import axios from 'axios';
import { useState, useEffect} from 'react';
import defaultPoster from '../resources/defaultposter.png'
import MetacriticIcon from '../resources/MetacriticIcon.png'
import Rotten_Tomatoes from '../resources/Rotten_Tomatoes.png'
import { useGlobalConfig } from './GlobalConfigContext'
import { useParams } from 'react-router-dom';


function DescriptionMovie(){
    const { id } = useParams();
    const [movieTMDB, setmovieTMDB] = useState([]);
    const [movieOMDB, setmovieOMDB] = useState([]);
    const [keyWords, setKeyWords] = useState([]);
    const [castList, setCastList] = useState([]);
    const imgUrlM = "https://image.tmdb.org/t/p/w400/";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=es&api_key=${apiKey}`);
  
        if (response.data) {
            setmovieTMDB(response.data);
            console.log('TMDB:', response.data);
        } else {
            console.error('Error: Datos de película no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }

      try {
        const apiKey = 'fb8928eb';
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`);
  
        if (response.data) {
            setmovieOMDB(response.data);
            console.log('OMDB:', response.data);
        } else {
            console.error('Error: Datos de película no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }

      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/keywords&apikey=${apiKey}`);
  
        if (response.data) {
            setKeyWords(response.data);
        } else {
            console.error('Error: Datos de película no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }

      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=es&api_key=${apiKey}`);
  
        if (response.data.cast) {
            setCastList(response.data);
            console.log('Cast:', response.data.cast);
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

  const renderGenres = () => {
    if (movieTMDB.genres && movieTMDB.genres.length > 0) {
      return movieTMDB.genres.map((genre) => (
        <div key={genre.id} className="genreItem">
          {genre.name}
        </div>
      ));
    }
    return null;
  };

    return(
        
        <div className='fullInfoMovieBox'>
            <div className='backdrop'>
                <img src={'https://image.tmdb.org/t/p/w1280' + movieTMDB.backdrop_path } alt='dune'></img>
            </div>
            <div className='dataMovieBox'>
                <div className='LeftColum'>
                    <div className='posterContainer'>
                        <img
                            src={movieTMDB.poster_path ? imgUrlM + movieTMDB.poster_path : defaultPoster}
                            alt={movieTMDB.title}
                        />
                    </div>
                    

                    <div className='ratingBox'>
                        <div className='ratingItem'>
                        <img src={Rotten_Tomatoes}/>
                            <p>{movieOMDB && movieOMDB.Ratings && movieOMDB.Ratings.length > 0 && (
                                <p>{movieOMDB.Ratings[1].Value}</p> )}
                            </p>
                        </div>
                        <div className='ratingItem'>
                            <img src={MetacriticIcon}/>
                            <p>{movieOMDB && movieOMDB.Ratings && movieOMDB.Ratings.length > 0 && (
                                <p>{movieOMDB.Ratings[2].Value}</p> )}
                            </p>
                        </div>
                        
                    </div>

                    <div id='genresBox' className='genresBox'> 
                        {renderGenres()} 
                    </div>

                </div>
                <div className='CentralColum'>
                    <div className='TituloPelicula'>
                        <h1>{movieTMDB.title}</h1>
                        <p>{movieOMDB.Year}</p>
                        <p> Dirigido por {movieOMDB.Director}</p>
                        
                    </div>
                    <div className='DescriptionMovie'>
                        <p className='TagLine'>{movieTMDB.tagline}</p>
                        <p>{movieTMDB.overview}</p>
                    </div>
                    <div className='OtherInfo'>
                    <p> Duracion: {movieOMDB.Runtime}</p>
                    <p>Escrita por: {movieOMDB.Writer}</p>
                    </div>
                </div>

                <div className='CastBox'>
                  <hi>Reparto</hi>
                  <div className='CastList'>
                    <ul>
                      {Array.isArray(castList) && castList.map((actor) => (
                          <li key={actor.id}>{actor.name} - {actor.character}</li>
                      ))}
                    </ul>
                  </div>
                </div>
            </div>
        </div>
        
        
    );
}

export default DescriptionMovie;