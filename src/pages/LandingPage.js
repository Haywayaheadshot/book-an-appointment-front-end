import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/landing-page.css';

function LandingPage() {
  const doctor = useSelector((state) => state.doctors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (!username) {
    navigate('/');
  }

  return (
    <div className="doctors-container">
      <h1>Welcome, {username}</h1>
      { doctor.map((doctor) => (
        <NavLink to={`/${doctor.name}`} key={doctor.id}>
          <section className="doctor-section">
            <img src={doctor.photo} alt="Portrait Of Doc" className="doctors-image" />
            <h1>
              {doctor.name}
            </h1>
            <h2>
              {doctor.specialty}
            </h2>
            <div className="doctor-age-xperience-div">
              <h4>
                Age:
                <span className="age-xperience-span">{doctor.age}</span>
                years
              </h4>
              <h4>
                Experience:
                <span className="age-xperience-span">{doctor.years_of_experience}</span>
                years
              </h4>
            </div>
          </section>
        </NavLink>
      ))}
    </div>
  );
}

export default LandingPage;
