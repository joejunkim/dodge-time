import React from 'react';
import { NavLink } from 'react-router-dom';

import './SplashPage.css';

function SplashPage() {
    return (
        <>
            <div className='splash-container'>
                <div className='splash-body'>
                    <h1>Welcome to DodgeThis!</h1>
                    <h3>Join groups to meet fellow players, search for local and national events, and most importantly, dodge balls!</h3>
                </div>
                <div className='splash-right'>
                    <h2>🔴Dodge</h2>
                    <h2>🟢Duck</h2>
                    <h2>🔵Dip</h2>
                    <h2>🟡Dive</h2>
                    <h2>🔴Dodge</h2>
                </div>
                {/* <div className='splash-right'>
                    <h2>Dodge</h2>
                    <h2>Duck</h2>
                    <h2>Dip</h2>
                    <h2>Dive</h2>
                    <h2>Dodge</h2>
                </div> */}
            </div>
            <NavLink to='/groups'>Search</NavLink>
        </>
    );
}

export default SplashPage;
