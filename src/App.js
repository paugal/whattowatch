import './style/App.css';
import theme from './theme'
import SelectThree from './components/SelectThree';
import Recomendations from './components/Recomendations'
import React, { useState } from 'react';
import TopVar from './components/TopVar';
import { ThemeProvider } from '@mui/material';

function App() {

  const [selectedMovies, setSelectedMovies] = useState([]);

  const updateSelectedMovies = (movies) => {
    setSelectedMovies(movies);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TopVar/>
        <div className="centeredDiv">
          <SelectThree updateSelectedMovies={updateSelectedMovies}/>
          <Recomendations selectedMovieIds={selectedMovies}/>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
