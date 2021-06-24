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
                    <p />
                    <p />
                    <NavLink to='/find'>Search For A Group or Event</NavLink>
                </div>
                <div className='splash-right'>
                    <h1>🔴Dodge</h1>
                    <h1>🟢Duck</h1>
                    <h1>🔵Dip</h1>
                    <h1>🟡Dive</h1>
                    <h1>🔴Dodge</h1>
                </div>
            </div>
        </>
    );
}

export default SplashPage;
