import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import DeleteDocs from '../components/dep/DeleteDocs';
import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/landing-page.css';
import Details from './Details';

const LandingPage = () => {
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
    <div className="doctors-container flex flex-col md:mx-28 md:gap-10 gap-5 md:pl-48 px-5">
      <h1 className="mt-20">
        Welcome,
        <span className="lg:text-2xl text-lg">
          {username}
        </span>
      </h1>
      <NavLink
        to={`/addDocForm?username=${username}`}
        type="button"
        className="mt-10 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add A Doc
      </NavLink>
      <div className="w-full grid gap-4 xl:grid-cols-2">
        {doctor && doctor.map((doctor) => (
          <section
            key={doctor.name}
            className="doctor-section flex flex-col items-center gap-5 lg:flex-row bg-[#CBE4DE] lg:p-14 rounded-xl overflow-hidden"
          >
            <button type="button" onClick={() => handleShowDetails(doctor)}>
              <section>
                <div className="flex-col justify-center items-center">
                  <img src={doctor.photo} alt="Portrait Of Doc" className="h-40 w-25 rounded-xl mb-5" />
                  <h1 className="lg:text-2xl text-lg font-bold">
                    {doctor.name}
                  </h1>
                </div>
                <div>
                  <h2 className="lg:text-3xl text-xl pb-16">
                    {doctor.specialty}
                  </h2>
                  <div className="doctor-age-xperience-div lg:text-2xl text-lg">
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
                </div>
              </section>
            </button>
            <DeleteDocs id={doctor.id} />
          </section>
        ))}
      </div>
      { showModal && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur">
          <div className="modal-content flex bg-[#CBE4DE] mx-8 md:mx-12 lg:mx-20 my-12 border rounded-lg px-10 py-12 overflow-auto h-[80%] border-black">
            <Details doctor={selectedDoctor} closeModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
