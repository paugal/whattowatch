import '../style/App.css';
import '../style/Recomendations.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poster from "./Poster.js";
import { useMovieContext } from './contextos/MovieContext';

function Recomendations({ selectedMovieIds }) {
  const { updateScrollPosition } = useMovieContext();
  const [recomFinalList, setRecomFinalList] = useState([]);
  const [seen, setSeen] = useState(['tt1160419'])
  const [fav, setFav] = useState(['tt1160419'])
  const [watchList, setwatchList] = useState(['tt1160419'])

  useEffect(() => {
    console.log('Fetching recommendations...');
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    console.log('Saved Scroll Position:', savedScrollPosition);

    if (savedScrollPosition) {
      console.log('Restoring scroll position:', savedScrollPosition);

      // Esperar 100ms antes de intentar desplazar la página
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 100);
    }
  }, []);

  useEffect(() => {
    console.log('Selected Movie IDs changed:', selectedMovieIds);

    const fetchRecomentdations = async () => {
      try {
        const apiKey = '6bce84c9599883d5e4033758c40ab14f';
        const promises = selectedMovieIds.map(async (movieId) => {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=es&api_key=${apiKey}`);
          return response.data;
        });

        const recomendations = await Promise.all(promises);
        const finalList = recomendations.flatMap(array => array.results);
        console.log('Fetched Recommendations:', finalList);
        setRecomFinalList(finalList);
        
        // Save scroll position after loading recommendations
        const scrollY = window.scrollY.toString();
        console.log('Saving scroll position after loading recommendations:', scrollY);
        sessionStorage.setItem('scrollPosition', scrollY);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedMovieIds && selectedMovieIds.length > 0) {
      fetchRecomentdations();
    }

    const handleScroll = () => {
      const scrollY = window.scrollY.toString();
      console.log('Handling scroll. Saving position:', scrollY);
      sessionStorage.setItem('scrollPosition', scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      console.log('Removing scroll event listener.');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedMovieIds]);

  return (
    <div className="contentContainer" id='home'>
      <h1 className='Titulo'>Películulas parecidas que tal vez te gusten</h1>
      <div className='recomendationBox'>
        {recomFinalList.map((movie) => (
          <Poster 
            key={movie.id} 
            id={movie.id} 
            name={movie.title} 
            isSeen={seen.includes(movie.id)}
            isFav={fav.includes(movie.id)}
            inWatchList={watchList.includes(movie.id)}/>
        ))}
      </div>
    </div>
  );
}

export default Recomendations;
