import '../style/App.css';
import '../style/TopBar.css';
import MyButtonLink from './MyButtonLink';
import { useHistory } from 'react-router-dom';


function TopVar(){
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
                        PERFIl
                    </a>
                    <a href={`/popular`}>
                        BUSCAR
                    </a>
                </div>
            </div>
            
        </div>
    );
}

export default TopVar;