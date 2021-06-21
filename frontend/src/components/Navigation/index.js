import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import './Navigation.css'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navbar__container'>
      <div className='navbar__logo'>
        <NavLink exact to="/">DodgeThis</NavLink>
      </div>
      <div className='navbar__right'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
