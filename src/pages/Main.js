import React from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LandingPage from './LandingPage';
import NavBar from '../components/NavBar';
import MyReservations from './MyReservations';
import ReserveForm from './ReserveForm';
import Details from './Details';
// import NavBarWrapper from '../components/NavBarWrapper';

function Main() {
  const location = useLocation();
  const showNavBar = ['/reservationForm', '/landingPage', '/reservationForm', '/reservations'].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/logInPage" element={<LogIn />} />
        {/* <NavBarWrapper> */}
        <Route exact path="/landingPage" element={<LandingPage />} />
        <Route exact path="/reservations" element={<MyReservations />} />
        <Route exact path="/reservationForm" element={<ReserveForm />} />
        {/* </NavBarWrapper> */}
        <Route exact path="/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default Main;
