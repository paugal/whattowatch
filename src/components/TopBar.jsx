import '../style/App.css';
import '../style/TopBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';


function TopVar(){


    function buscar(){
        document.getElementById("startBuscar").style.display = "none";
        document.getElementById("cruzBuscador").style.display = "block";
        document.getElementsByClassName("buscador")[0].style.display = "block";
    }

    function noBuscar(){
        document.getElementById("startBuscar").style.display = "block";
        document.getElementById("cruzBuscador").style.display = "none";
        document.getElementsByClassName("buscador")[0].style.display = "none";
    }

    return (
        <div className='TopBarContainer'>
            <div className='TopBarCenter'>

            
                <a id='Logo' href={`/`}>
                    WhatToWatch
                </a>
                <div className='topBarButtons' >
                    <a href={`/popular`}>
                        POPULAR
                    </a>
                    <a href={`/popular`}>
                        WATCHLIST
                    </a>
                    <a href={`/popular`}>
                        PERFIL
                    </a>
                    <div className='SearchBarTop' >
                        <div id="startBuscar" onClick={buscar}>
                            BUSCAR
                        </div>
                        <FontAwesomeIcon onClick={noBuscar} id="cruzBuscador" icon={faXmark} size="xl" style={{color: "#f0f5ff", display: "none"}} />
                        <div className='buscador' >
                            <input id='barraBuscador'/>
                            <a href={`/popular`}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} />
                            </a>
                        </div>

                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default TopVar;