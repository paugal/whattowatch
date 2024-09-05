import "../style/App.css";
import "../style/TopBar.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TopVar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery != "") {
      /* window.location.href = `/search/${searchQuery}`; */
      navigate(`/search/${searchQuery}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearchBar = () => {
    setIsSearching((prevState) => !prevState);
  };

  return (
    <div className="TopBarContainer">
      <div className="TopBarCenter">
        <Link id="Logo" to="/">
          WhatToWatch
        </Link>
        <div className="topBarButtons">
          <Link to="/popular">POPULAR</Link>
          <Link to="/watchlist">WATCHLIST</Link>
          <Link to="/perfil">PERFIL</Link>
          <div className="SearchBarTop">
            {!isSearching ? (
              <div id="startBuscar" onClick={toggleSearchBar}>
                BUSCAR
              </div>
            ) : (
              <div className="SearchBoxInput">
                <FontAwesomeIcon
                  onClick={toggleSearchBar}
                  id="cruzBuscador"
                  icon={faTimes}
                  size="lg"
                  style={{ color: "#f0f5ff" }}
                />
                <div className="buscador">
                  <input
                    id="barraBuscador"
                    autoFocus
                    onKeyDown={handleKeyPress}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FontAwesomeIcon
                    className="lupaIcon"
                    onClick={handleSearch}
                    icon={faMagnifyingGlass}
                    style={{ color: "#faebd7" }}
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
