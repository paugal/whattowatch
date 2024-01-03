import React, { useState } from 'react';
import './App.css';

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
          <div className="inputContainer">
            <label htmlFor="pelicula1">Película 1:</label>
            <input
              type="text"
              id="pelicula1"
              value={pelicula1}
              onChange={(e) => setPelicula1(e.target.value)}
            />
          </div>

          {/* Input para Película 2 */}
          <div className="inputContainer">
            <label htmlFor="pelicula2">Película 2:</label>
            <input
              type="text"
              id="pelicula2"
              value={pelicula2}
              onChange={(e) => setPelicula2(e.target.value)}
            />
          </div>

          {/* Input para Película 3 */}
          <div className="inputContainer">
            <label htmlFor="pelicula3">Película 3:</label>
            <input
              type="text"
              id="pelicula3"
              value={pelicula3}
              onChange={(e) => setPelicula3(e.target.value)}
            />
          </div>
        </div>

        {/* Otro contenido de la aplicación */}
      </div>
    </div>
  );
}

export default App;
