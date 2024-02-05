import '../style/App.css';
import '../style/Popular.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poster from './Poster';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

function PopularMovies() {
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = '6bce84c9599883d5e4033758c40ab14f';
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=es&page=${page}&api_key=${apiKey}`);

                if (response.data) {
                    setPopular((prevMovies) => [...prevMovies, ...response.data.results]);
                    setTotalPages(response.data.total_pages);
                    setLoading(false);
                } else {
                    console.error('Error: Datos de TMDB no encontrados.');
                }
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchMovies();
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement || document.body;

        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
            setLoading(true);
            handleNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]); // Agregar 'loading' como dependencia para evitar múltiples llamadas

    return (
        <div>
            <h1>Peliculas Populares</h1>
            <div className='filterBox' >
                Filtros 
                <div>|</div>
                <div>
                    Calificación 
                    <FontAwesomeIcon icon={faSortDown} style={{color: "#faebd7", marginLeft: "5px"}} />
                </div>
            </div>
            <div className='PopularBox'>
                {popular.map((movie) => (
                    <Poster key={movie.id} id={movie.id} name={movie.title} />
                ))}
            </div>
            {loading && <p>Cargando...</p>}
        </div>
    );
}

export default PopularMovies;
