import React, { useState, useEffect } from 'react';
import '../styles/nav-bar.css';
import { GiStethoscope } from 'react-icons/gi';
import Hamburger from 'hamburger-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsername } from '../redux/users/Users';

function NavBar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const encodedUsername = username ? encodeURIComponent(username) : '';

  // eslint-disable-next-line
  const user = useSelector((state) => state.users.find((user) => user.username === encodedUsername));

  useEffect(() => {
    dispatch(getUserByUsername(encodedUsername));
  }, [dispatch, encodedUsername]);

  useEffect(() => {
    getUserByUsername();
    const body = document.getElementById('body');
    const doctor = document.querySelector('.doctors-container');
    if (open) {
      body.classList.add('open');
      doctor.classList.add('open');
    } else {
      body.classList.remove('open');
      doctor.classList.remove('open');
    }
  }, [open]);

  return (
    <div className="nav-bar-container">
      <GiStethoscope size="5em" />
      <h1>Book A Doc</h1>
      <Hamburger toggled={open} toggle={setOpen} />
      {open && (
        <ul className="hamburger-pop-ul">
          {user && (
            <li key={user.username}>
              <img src={user.photo} alt="DP" className="user-dp" />
              <h3>{user.name}</h3>
            </li>
          )}
          <li>
            <NavLink to={`/landingPage?username=${encodedUsername}`}>
              <button type="button" onClick={() => setOpen(false)}>
                Doctors
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/reservationForm?username=${encodedUsername}`}>
              <button type="button" onClick={() => setOpen(false)}>
                Reserve A Doc
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/reservations?username=${encodedUsername}`}>
              <button type="button" onClick={() => setOpen(false)}>
                My Reservations
              </button>
            </NavLink>
          </li>
          <li>
            <button type="button" onClick={() => setOpen(false)}>
              Add Doc
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setOpen(false)}>
              Delete Doc
            </button>
          </li>
          <li>
            <NavLink to="/logInPage">
              <button type="button" onClick={() => setOpen(false)}>
                Log Out
              </button>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavBar;
