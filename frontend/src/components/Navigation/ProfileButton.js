import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, NavLink, useHistory } from "react-router-dom";

import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button  onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul >
            <Link className='navbar__link' to={`/users/my-account`}>My Account</Link>
            <Link className='navbar__link' onClick={logout}>Log Out</Link>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
