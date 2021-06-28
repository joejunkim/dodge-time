import React from 'react';
import * as sessionActions from "../../store/session";

import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './SplashPage.css';

function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const loginDemo = async (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password'}))
      }

    let demoLink;
    if (!sessionUser) {
        demoLink = (
            <>
                <p />
                <NavLink exact onClick={loginDemo} to="/">Want A Test Run? Log In As A Demo User </NavLink>
            </>
        );
    }

    return (
        <>
            <div className='splash-container'>
                <div className='splash-body'>
                    <h1>Welcome to DodgeThis!</h1>
                    <h3>Join groups to meet fellow players, search for local and national events, and most importantly, dodge balls!</h3>
                    <h3>Remember, if you can dodge a wrench..</h3>
                    <p />
                    <NavLink to='/find'>Search For Groups And Events</NavLink>
                    {demoLink}
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
