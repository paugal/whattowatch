import '../style/App.css';
import MyButtonLink from './MyButtonLink';
import { useHistory } from 'react-router-dom';


function TopVar(){
    return (
        <div className='TopVarContainer'>
            <div className='Logo'>
                <a href={`/`}>
                    WhatToWatch
                </a>
            </div>
        </div>
    );
}

export default TopVar;