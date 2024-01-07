import React, { useState } from 'react';
import './style/App.css';
import SearchBar from './components/SearchBar';

function App() {
  // Estado para almacenar los nombres de las películas
  const [pelicula1, setPelicula1] = useState('');
  const [pelicula2, setPelicula2] = useState('');
  const [pelicula3, setPelicula3] = useState('');

  return (
    <div className="App">
      <div className="centeredDiv">
        <div className="contentContainer">
          <h1>What To Watch</h1>

          {/* Input para Película 1 */}
          <SearchBar/>
          <SearchBar/>
          <SearchBar/>

          <div className='botonesStart'>
            <button>Buscar</button>
            <button>Resetear</button>
          </div>
        
        </div>

        {/* Otro contenido de la aplicación */}
      </div>
    </div>
  );
}

export default App;
