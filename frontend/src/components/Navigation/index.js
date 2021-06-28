import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal'

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignUpFormModal />
      </>
    );
  }


  return (
    <ul className='navbar__container'>
      <div className='navbar__logo'>
        <NavLink exact to="/">DODGETHIS</NavLink>
      </div>
      <div>
        <NavLink exact to="/find">Search</NavLink>
      </div>
      <div className='navbar__right'>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
