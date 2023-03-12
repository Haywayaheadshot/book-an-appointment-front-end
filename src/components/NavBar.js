import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
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
    const body = document.getElementById('body');
    const doctor = document.querySelector('.doctors-container');
    if (open) {
      body.classList.add('open');
      if (location.pathname === '/landingPage') {
        doctor.classList.add('open');
      }
    } else {
      body.classList.remove('open');
      if (location.pathname === '/landingPage') {
        doctor.classList.remove('open');
      }
    }
  }, [open, location.pathname]);

  return (
    <div className="flex md:flex-col fixed md:h-screen justify-center items-center gap-16 md:w-48 w-screen h-28 bg-[#2E4F4F]">
      <IconContext.Provider value={{ size: '5em', className: 'global-class-name', color: 'hsl(0, 0%, 100%)' }}>

        <GiStethoscope />
      </IconContext.Provider>
      <h1>Book A Doc</h1>
      <div className="md:hidden">
        <Hamburger toggled={open} toggle={setOpen} />
      </div>
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
            <NavLink to="/logInPage">
              <button type="button" onClick={() => setOpen(false)}>
                Log Out
              </button>
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="text-[#CBE4DE] hidden flex-col gap-10 md:flex">
        <li>
          <NavLink className="bg-[#2C3333] p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to={`/reservationForm?username=${encodedUsername}`}>
            <button type="button" onClick={() => setOpen(false)}>
              Reserve A Doc
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink className="bg-[#2C3333] p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to={`/reservations?username=${encodedUsername}`}>
            <button type="button" onClick={() => setOpen(false)}>
              My Reservations
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink className="bg-[#2C3333] p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to="/logInPage">
            <button type="button" onClick={() => setOpen(false)}>
              Log Out
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
