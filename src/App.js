import "./style/App.css";
import SelectThree from "./components/SelectThree";
import Recomendations from "./components/Recomendations";
import React, { useState } from "react";
import TopVar from "./components/TopBar";
import DescriptionMovie from "./components/DescriptionMovie";
import { MovieProvider } from "./components/contextos/MovieContext";
import PopularMovies from "./components/PopularMovies";
import SearchMovies from "./components/SearchMovies";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const updateSelectedMovies = (movies) => {
    setSelectedMovies(movies);
  };

  return (
    <div className="App">
      <Router basename="/whattowatch">
        <TopVar />
        <div className="centeredDiv">
          <MovieProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <SelectThree updateSelectedMovies={updateSelectedMovies} />
                }
              />
              <Route path="/film/:id" element={<DescriptionMovie />} />
              <Route path="/popular" element={<PopularMovies />} />
              <Route path="/search/:name" element={<SearchMovies />} />
            </Routes>
          </MovieProvider>
        </div>
      </Router>
    </div>
  );
}

export default App;
