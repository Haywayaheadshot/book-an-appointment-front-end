import React, { useState } from 'react';
import '../styles/nav-bar.css';
import { GiStethoscope } from 'react-icons/gi';
import Hamburger from 'hamburger-react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [open, setClose] = useState(false);
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
            <li>Display user Image</li>
            <li>Display username</li>
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
          </ul>
        ) : null}
    </div>
  );
}

export default NavBar;
