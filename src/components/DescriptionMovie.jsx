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
import defaultAvatar from '../resources/placeholder/defaultAvatar.jpg'
import Poster from './Poster';


function DescriptionMovie(){
    const { id } = useParams();
    const [movieTMDB, setmovieTMDB] = useState([]);
    const [movieOMDB, setmovieOMDB] = useState([]);
    const [keyWords, setKeyWords] = useState([]);
    const [castList, setCastList] = useState([]);
    const [titleLenght, setTitleLenght] = useState([]);
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    

    const imgUrlM = "https://image.tmdb.org/t/p/w400/";
    const imgUrlS = "https://image.tmdb.org/t/p/w200/";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=es&api_key=${apiKey}`);
  
        if (response.data) {
            setmovieTMDB(response.data);
        } else {
            console.error('Error: Datos de TMDB no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }

      try {
        const apiKey = 'fb8928eb';
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`);
  
        if (response.data) {
            setmovieOMDB(response.data);
            setTitleLenght(response.data.Title.length);
        } else {
            console.error('Error: Datos de OMDB no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }

      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/keywords?language=es&api_key=${apiKey}`);
  
        if (response.data) {
          setKeyWords(response.data.keywords);
        } else {
            console.error('Error: Keywords no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }

      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=es&api_key=${apiKey}`);
  
        if (response.data.cast) {
            setCastList(response.data.cast);
        } else {
            console.error('Error: Creditos no encontrados.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
      
      

    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const dataMovieBox = document.querySelector('.dataMovieBox');
    if(!movieTMDB.backdrop_path){
      
      dataMovieBox.style.marginTop = '10px';
    }else{
      dataMovieBox.style.marginTop = '450px';
    }

    const fetchMovies = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        
        if(movieTMDB.id){
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieTMDB.id}/recommendations?api_key=${apiKey}`);
          setRecomendaciones(response.data.results);
        } else {
            console.error('Error: Recomendaciones no encontradas.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    }
    fetchMovies();
  }, [movieTMDB]);

  const handleLoadMore = () => {
    // Aumentamos el número de elementos mostrados en 10
    setVisibleCount(prevCount => prevCount + 10);
  };

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
          { movieTMDB.backdrop_path ? (
            <div className='backdrop'>
                <img src={'https://image.tmdb.org/t/p/w1280' + movieTMDB.backdrop_path } alt='dune'></img>
            </div>
          ) : null}
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
                                <p>{movieOMDB.Ratings[1] ? movieOMDB.Ratings[1].Value : 'Sin Nota'}</p> )}
                            </p>
                        </div>
                        <div className='ratingItem'>
                            <img src={MetacriticIcon}/>
                            <p>{movieOMDB && movieOMDB.Ratings && movieOMDB.Ratings.length > 0 && (
                                <p>{movieOMDB.Ratings[2] ? movieOMDB.Ratings[2].Value : 'Sin Nota'}</p> )}
                            </p>
                        </div>
                        
                    </div>

                    <div id='genresBox' className='genresBox'> 
                        {renderGenres()} 
                    </div>

                </div>
                <div className='CentralColum'>
                  <div className="TituloPelicula">
                    
                    {titleLenght > 10 ? (
                      <div className="BigTitle">
                        <h1>{movieTMDB.title}</h1>
                        <p>{movieOMDB.Year} Dirigido por {movieOMDB.Director}</p>
                      </div>
                    ) : (
                      <div className="SmallTitle" >
                        <h1>{movieTMDB.title}</h1>
                        <p>{movieOMDB.Year}</p>
                        <p>Dirigido por {movieOMDB.Director}</p>
                        
                      </div>
                    )}
                </div>
                    <div className='DescriptionMovie'>
                        <p className='TagLine'>{movieTMDB.tagline}</p>
                        <p>{movieTMDB.overview}</p>
                    </div>
                    <div className='OtherInfoTitle'>
                      <div> Duracion: {movieOMDB.Runtime}</div>
                      <div>Escrita por: {movieOMDB.Writer}</div>
                    </div>


                    <div className='CastBox'>
                      <div className='CastTitle'>Reparto</div>
                      <div className='CastList'>
                        
                          {Array.isArray(castList) && castList.map((actor) => (
                            <div className='ActorBox'>
                              <img src={ actor.profile_path ? imgUrlS + actor.profile_path : defaultAvatar} alt={actor.name}></img>
                              <div  key={actor.id}> <div className='ActorName'>{actor.name}</div> {actor.character} </div>
                            </div>
                          ))}
                        
                      </div>
                    </div>

                    <div className='Recomendaciones' >
                      <div className='CastTitle'> Recomendaciones </div>
                      <div className='RecomendationsList' style={{ width: '650px', overflowX: 'scroll', display: 'flex' }}>
                        {recomendaciones.map((movie) => (
                          <Poster 
                            key={movie.id} 
                            id={movie.id} 
                            name={movie.title}/>
                        ))}
                      </div>

                    </div>
                    {keyWords.length > 0 && (
                    <div className='ThemeInfo' >
                      <div className='CastTitle'>Temas</div>
                      <div className='ThemeBox'>
                        {/* Mapeamos los primeros 'visibleCount' elementos */}
                        {Array.isArray(keyWords) && keyWords.slice(0, visibleCount).map((theme) => (
                          <div className='ThemItem' key={theme.id}>
                            {theme.name}
                          </div>
                        ))}

                        {/* Botón para cargar más elementos si hay más de 10 */}
                        {keyWords.length > visibleCount && (
                          <button onClick={handleLoadMore}>Load More</button>
                        )}
                    </div>

                    </div>
                    )}
                </div>

                
            </div>
        </div>
        
        
    );
}

export default DescriptionMovie;