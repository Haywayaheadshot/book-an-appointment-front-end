import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctors } from '../redux/landingPage/LandingPage';

function LandingPage() {
  const doctor = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);
  return (
    <div>
      { doctor.map((doctor) => (
        <section key={doctor.name}>
          <h1>
            {doctor.name}
          </h1>
          <img src={doctor.photo} alt="Portrait Of Doc" />
        </section>
      ))}
    </div>
  );
}

export default LandingPage;
