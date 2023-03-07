import React, { useState, useEffect } from 'react';
import '../styles/nav-bar.css';
import { GiStethoscope } from 'react-icons/gi';
import Hamburger from 'hamburger-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../redux/users/Users';

function NavBar() {
  const [open, setClose] = useState(false);

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');

  const filteredUser = user.filter((user) => user.username
    .toLowerCase().match(username.toLowerCase()));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const toggleMenu = () => {
    setClose(!open);
    const body = document.getElementById('body');
    if (!open) {
      body.classList.add('open');
    } else {
      body.classList.remove('open');
    }
  };

  return (
    <div className="nav-bar-container">
      <GiStethoscope size="5em" />
      <h1>
        Book A Doc
      </h1>
      <Hamburger
        toggled={open}
        toggle={toggleMenu}
      />
      { open
        ? (
          <ul className="hamburger-pop-ul">
            {filteredUser.map((user) => (
              <li key={user.username}>
                <img src={user.photo} alt="DP" className="user-dp" />
                <h3>
                  {user.name}
                </h3>
              </li>
            ))}
            <li>
              <NavLink to="/landingPage">
                <button type="button" onClick={() => toggleMenu(false)}>
                  Doctors
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservationForm">
                <button type="button" onClick={() => toggleMenu(false)}>
                  Reserve A Doc
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservations">
                <button type="button" onClick={() => toggleMenu(false)}>
                  My Reservations
                </button>
              </NavLink>
            </li>
            <li>
              <button type="button" onClick={() => toggleMenu(false)}>
                Add Doc
              </button>
            </li>
            <li>
              <button type="button" onClick={() => toggleMenu(false)}>
                Delete Doc
              </button>
            </li>
            <li>
              <NavLink to="/logInPage">
                <button type="button" onClick={() => toggleMenu(false)}>
                  Log Out
                </button>
              </NavLink>
            </li>
          </ul>
        ) : null}
    </div>
  );
}

export default NavBar;
