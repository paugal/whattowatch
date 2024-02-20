import '../style/App.css';
import '../style/TopBar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';

function TopVar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if(searchQuery != ''){
        window.location.href = `/search/${searchQuery}`;
    }
    
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSearchBar = () => {
    setIsSearching((prevState) => !prevState);
  };

  return (
    <div className='TopBarContainer'>
      <div className='TopBarCenter'>
        <a id='Logo' href={`/`}>
          WhatToWatch
        </a>
        <div className='topBarButtons'>
          <a href={`/popular`}>POPULAR</a>
          <a href={`/watchlist`}>WATCHLIST</a>
          <a href={`/perfil`}>PERFIL</a>
          <div className='SearchBarTop'>
            {!isSearching ? (
              <div id='startBuscar' onClick={toggleSearchBar}>
                BUSCAR
              </div>
            ) : (
                <div className='SearchBoxInput'>
                    <FontAwesomeIcon
                    onClick={toggleSearchBar}
                    id='cruzBuscador'
                    icon={faTimes}
                    size='lg'
                    style={{ color: '#f0f5ff' }}
                    />
                    <div className="buscador">
                    <input
                        id='barraBuscador'
                        autoFocus
                        onKeyDown={handleKeyPress}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FontAwesomeIcon
                        className='lupaIcon'
                        onClick={handleSearch}
                        icon={faMagnifyingGlass}
                        style={{ color: '#faebd7' }}
                    />
                    </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopVar;
