import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/details.css';

function Details({ doctor, closeModal }) {
  const webLocation = useLocation();
  const searchParams = new URLSearchParams(webLocation.search);
  const username = searchParams.get('username');
  const encodedUsername = encodeURIComponent(username);

  return (
    <div>
      <button type="button" onClick={closeModal}>Close</button>
      <section className="details-sec" key={doctor.id}>
        <img src={doctor.photo} alt="Doctors Portrait" className="doc-details-pic" />
        <div className="details-age-div">
          <h5>
            Age:
            <span className="details-age-span">{doctor.age}</span>
            years
          </h5>
          <h5>
            Experience:
            <span className="details-age-span">{doctor.years_of_experience}</span>
            years
          </h5>
        </div>
        <div className="details-age-div">
          <h5>
            Location:
            <span className="details-age-span">{doctor.location_of_work}</span>
          </h5>
          <h5>
            Specialty:
            <span className="details-age-span">{doctor.specialty}</span>
          </h5>
        </div>
        <div className="details-age-div">
          <h5>
            Qualification:
            <span className="details-age-span">{doctor.qualifications}</span>
          </h5>
        </div>
        <h4>{doctor.bio}</h4>
      </section>
      <NavLink to={`/reservationForm?username=${encodedUsername}`}>
        <button type="button">
          Reserve
        </button>
      </NavLink>
    </div>
  );
}

export default Details;

Details.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    years_of_experience: PropTypes.number.isRequired,
    location_of_work: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    qualifications: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
