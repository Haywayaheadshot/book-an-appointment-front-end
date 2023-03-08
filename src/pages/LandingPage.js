import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/landing-page.css';
import Details from './Details';

function LandingPage() {
  const doctor = useSelector((state) => state.doctors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const body = document.getElementById('body');

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (!username) {
    navigate('/');
  }

  const handleShowDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
    body.classList.add('open');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    body.classList.remove('open');
  };

  return (
    <div className="doctors-container">
      <h1>
        Welcome,
        {username}
      </h1>
      {doctor && doctor.map((doctor) => (
        <button type="button" onClick={() => handleShowDetails(doctor)} key={doctor.name}>
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
        </button>
      ))}
      { showModal && (
        <div className="modal">
          <div className="modal-content">
            <Details doctor={selectedDoctor} closeModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
