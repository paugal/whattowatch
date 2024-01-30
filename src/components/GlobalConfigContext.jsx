// GlobalConfigContext.js
import { createContext, useState, useContext } from 'react';

const GlobalConfigContext = createContext();

export const GlobalConfigProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [fontSize, setFontSize] = useState('medium');
  const [movieSelected, setMovieSelected] = useState([]);
  const [inMoviePage, setInMoviePage] = useState(false);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const changeFontSize = (newSize) => {
    setFontSize(newSize);
  };

  return (
    <GlobalConfigContext.Provider value={{ 
        language, changeLanguage, 
        fontSize, changeFontSize,
        movieSelected, setMovieSelected,
        inMoviePage, setInMoviePage
        }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = () => {
  return useContext(GlobalConfigContext);
};

