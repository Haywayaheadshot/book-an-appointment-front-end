import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getReservations } from '../redux/myReservations/MyReservations';
import '../styles/my-reservations.css';

function MyReservations() {
  const dispatch = useDispatch();
  const webLocation = useLocation();
  const searchParams = new URLSearchParams(webLocation.search);
  const username = searchParams.get('username');
  const encodedUsername = encodeURIComponent(username);

  const reservations = useSelector((state) => state.reservations);

  const mappedReservations = reservations.reservations;
  console.log(mappedReservations);

  useEffect(() => {
    dispatch(getReservations(encodedUsername));
  }, [dispatch, encodedUsername]);

  return (
    <div className="reservations-container">
      {mappedReservations && mappedReservations.map((reservation) => (
        <section className="reservations-section" key={reservation.id}>
          <div className="reservation-header">
            <h1>
              Title:
              {reservation.title}
            </h1>
            <h3>
              Date:
              {reservation.reservation_date}
            </h3>
          </div>
          <div>
            <h1>
              Doctor:
              {reservation.doctor_name}
            </h1>
            <p>
              <b>Purpose:</b>
              {reservation.purpose}
            </p>
            <h3>
              Location:
              {reservation.location}
            </h3>
            <h4>
              Contact:
              {reservation.phone_number}
            </h4>
          </div>
        </section>
      ))}
    </div>
  );
}

export default MyReservations;
