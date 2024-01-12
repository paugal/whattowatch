import './style/App.css';
import SelectThree from './components/SelectThree';
import Recomendations from './components/Recomendations'
import React, { useState } from 'react';
import TopVar from './components/TopVar';

function App() {

  const [selectedMovies, setSelectedMovies] = useState([]);

  const updateSelectedMovies = (movies) => {
    setSelectedMovies(movies);
  };

  return (
    <div className="App">
      <TopVar/>
      <div className="centeredDiv">
        <SelectThree updateSelectedMovies={updateSelectedMovies}/>
        <Recomendations selectedMovieIds={selectedMovies}/>
      </div>
    </div>
  );
}
export default App;
