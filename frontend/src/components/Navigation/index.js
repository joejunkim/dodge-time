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
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <span className='navbar__right'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </span>
    );
  }

  return (
    <span className='navbar__container'>
      <NavLink exact to="/" className='navbar__logo'>DodgeThis</NavLink>
      {isLoaded && sessionLinks}
    </span>
  );
}

export default Navigation;
