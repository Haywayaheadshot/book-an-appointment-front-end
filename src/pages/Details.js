import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/details.css';

const Details = ({ doctor, closeModal }) => {
  const webLocation = useLocation();
  const searchParams = new URLSearchParams(webLocation.search);
  const username = searchParams.get('username');
  const encodedUsername = encodeURIComponent(username);

  return (
    <div>
      <button
        type="button"
        className="mb-10 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        onClick={closeModal}
      >
        Close
      </button>
      <section className="details-sec md:flex items-center justify-center w-full gap-5" key={doctor.id}>
        <img
          src={doctor.photo}
          alt="Doctors Portrait"
          className="w-2/3"
        />
        <div className="">
          <div className=" gap-5 details-age-div">
            <h4 className="text-2xl text-green-800">doctor info</h4>
            <div className="flex-col flex gap-5">
              <div className="lg:flex flex-col lg:gap-10 gap-5">
                <h5 className="text-xl">
                  Age:
                  <span className="details-age-span ">{doctor.age}</span>
                  years
                </h5>
                <h5 className="text-xl">
                  Experience:
                  <span className="details-age-span ">
                    {doctor.years_of_experience}
                  </span>
                  years
                </h5>
              </div>
              <div className="lg:flex flex-col lg:gap-10 gap-5">
                <h5 className="text-xl">
                  Location:
                  <span className="details-age-span ">
                    {doctor.location_of_work}
                  </span>
                </h5>
                <h5 className="text-xl">
                  Specialty:
                  <span className="details-age-span ">{doctor.specialty}</span>
                </h5>
              </div>
            </div>
          </div>
          <div className="details-age-div">
            <h5 className="text-xl mt-5">
              <span className="text-2xl text-green-800 ">
                Qualification:
              </span>
              <br />
              <span className="details-age-span">{doctor.qualifications}</span>
            </h5>
          </div>
          <p className="mt-5 w-11/12">
            <span className="text-2xl text-green-800 ">Bio:</span>
            <br />
            {doctor.bio}
          </p>
        </div>
      </section>
      <NavLink to={`/reservationForm?username=${encodedUsername}`}>
        <button
          className="mt-10 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="button"
        >
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
