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
    <div className="flex flex-col md:mx-28 md:gap-10 gap-5 md:pl-48 px-5">
      <h1 className="mt-20">
        Welcome,
        <span className="text-2xl">
          {username}
        </span>
      </h1>
      {doctor && doctor.map((doctor) => (
        <button type="button" onClick={() => handleShowDetails(doctor)} key={doctor.name}>
          <section className="doctor-section flex flex-col items-center gap-5 lg:flex-row bg-[#CBE4DE] p-14 rounded-xl">
            <img src={doctor.photo} alt="Portrait Of Doc" className="w-1/2 rounded-xl" />
            <h1 className="text-xl">
              {doctor.name}
            </h1>
            <div>
              <h2 className="text-3xl pb-16">
                {doctor.specialty}
              </h2>
              <div className="doctor-age-xperience-div text-2xl">
                <h4>
                  Age:
                  <span className="age-xperience-span mr-16">{doctor.age}</span>
                  years
                </h4>
                <h4>
                  Experience:
                  <span className="age-xperience-span mr-16">{doctor.years_of_experience}</span>
                  years
                </h4>
              </div>
            </div>
          </section>
        </button>
      ))}
      { showModal && (
        <div style={{
          position: 'fixed',
          top: '15vh',
          backgroundColor: '#fff',
          height: '70vh',
          placeSelf: 'center',
          overflowY: 'scroll',
          scrollPadding: '24px',
          scrollSnapType: 'y mandatory',
          border: '1px solid #000',
          padding: '20px',
        }}
        >
          <div className="modal-content">
            <Details doctor={selectedDoctor} closeModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
