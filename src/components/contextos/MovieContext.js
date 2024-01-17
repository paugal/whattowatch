// MovieContext.js
import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateSelectedMovies = (movies) => {
    setSelectedMovies(movies);
  };

  const updateScrollPosition = (position) => {
    setScrollPosition(position);
  };

  return (
    <MovieContext.Provider value={{ selectedMovies, updateSelectedMovies, scrollPosition, updateScrollPosition }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
