import '../style/App.css';
import '../style/DescriptionMovie.css'
import React from 'react';


function DescriptionMovie(){

    return(
        
        <div className='fullInfoMovieBox'>
            <div className='backdrop'>
                <img src='https://image.tmdb.org/t/p/w1280/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg' alt='dune'></img>
            </div>
        </div>
        
    );
}

export default DescriptionMovie;