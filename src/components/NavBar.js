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
      <h1 className="text-white text-xl">Book A Doc</h1>
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
            <NavLink onClick={() => setOpen(false)} to={`/landingPage?username=${encodedUsername}`}>
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setOpen(false)} to={`/reservationForm?username=${encodedUsername}`}>
              Reserve A Doc
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setOpen(false)} to={`/reservations?username=${encodedUsername}`}>
              My Reservations
            </NavLink>
          </li>
          <li>
            <NavLink to="/logInPage" onClick={() => setOpen(false)}>
              Log Out
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="text-[#CBE4DE] hidden flex-col gap-10 items-stretch md:flex">
        <li>
          <NavLink onClick={() => setOpen(false)} className="bg-[#2C3333] w-full p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to={`/reservationForm?username=${encodedUsername}`}>
            Reserve A Doc
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => setOpen(false)} className="bg-[#2C3333] p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to={`/landingPage?username=${encodedUsername}`}>
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => setOpen(false)} className="bg-[#2C3333] p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to={`/reservations?username=${encodedUsername}`}>
            My Reservations
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => setOpen(false)} className="bg-[#2C3333] p-3 rounded-lg hover:bg-[#0E8388] hover:text-white" to="/logInPage">
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
