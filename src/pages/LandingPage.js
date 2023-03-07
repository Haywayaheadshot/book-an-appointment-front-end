import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/landing-page.css';

function LandingPage() {
  const doctor = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);
  return (
    <div className="doctors-container">
      { doctor.map((doctor) => (
        <section key={doctor.name} className="doctor-section">
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
      ))}
    </div>
  );
}

export default LandingPage;
