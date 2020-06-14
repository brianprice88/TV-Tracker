import React from 'react';
import './UserPage.css';
import TopBar from './components/TopBar.jsx'
import Searchbar from './components/Searchbar';

export default function UserPage ({ axiosHandler, user, shows }) {
        return (
            <div className='container-fluid'>
                <TopBar
                axiosHandler={axiosHandler}
                user={user}
                />
                <Searchbar 
                axiosHandler={axiosHandler}
                user={user}
                />
            </div>
        )
}