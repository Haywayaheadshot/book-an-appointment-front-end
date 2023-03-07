import React, { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctors } from '../redux/landingPage/LandingPage';
import '../styles/details.css';

function Details() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctor = useSelector((state) => state.doctors);

  const filteredDoctor = doctor.filter((doc) => doc.name
    .toLowerCase().match(params.id.toLowerCase()));

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (!params) {
    navigate('/');
  }
  return (
    <div>
      <NavLink to="/landingPage?username=:username">
        <button type="button">
          Back
        </button>
      </NavLink>
      {filteredDoctor.map((doc) => (
        <section className="details-sec" key={doctor.id}>
          <img src={doc.photo} alt="Doctors Portrait" className="doc-details-pic" />
          <div className="details-age-div">
            <h5>
              Age:
              <span className="details-age-span">{doc.age}</span>
              years
            </h5>
            <h5>
              Experience:
              <span className="details-age-span">{doc.years_of_experience}</span>
              years
            </h5>
          </div>
          <div className="details-age-div">
            <h5>
              Location:
              <span className="details-age-span">{doc.location_of_work}</span>
            </h5>
            <h5>
              Specialty:
              <span className="details-age-span">{doc.specialty}</span>
            </h5>
          </div>
          <div className="details-age-div">
            <h5>
              Qualification:
              <span className="details-age-span">{doc.qualifications}</span>
            </h5>
          </div>
          <h4>{doc.bio}</h4>
        </section>
      ))}
      <NavLink to="/reservationForm?username=:username">
        <button type="button">
          Reserve
        </button>
      </NavLink>
    </div>
  );
}

export default Details;
