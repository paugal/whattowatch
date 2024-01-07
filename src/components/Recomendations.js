import '../style/App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PosterList from "./PosterList.js"


function SelectTree() {

  return (
    <div className="contentContainer" id='home'>
        <h1>Peliculas parecidas que tal vez te gusten</h1>

        <div>
          <PosterList/>
        </div>
        <div className='botonesStart'>
        <button>Show More</button>
        </div>
    
    </div>
  );
}

export default SelectTree;
