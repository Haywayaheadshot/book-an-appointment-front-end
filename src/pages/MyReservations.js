import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getReservations } from '../redux/myReservations/MyReservations';
import doc from '../assets/doc_img.jpg';
import '../styles/my-reservations.css';

function MyReservations() {
  const dispatch = useDispatch();
  const webLocation = useLocation();
  const searchParams = new URLSearchParams(webLocation.search);
  const username = searchParams.get('username');
  const encodedUsername = encodeURIComponent(username);

  const reservations = useSelector((state) => state.reservations);

  const mappedReservations = reservations.reservations;

  useEffect(() => {
    dispatch(getReservations(encodedUsername));
  }, [dispatch, encodedUsername]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${doc})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="reservations-container w-screen h-screen flex justify-center items-center p-20 overflow-auto"
      >
        <div className="lg:w-1/2 w-fill flex lg:grid lg:grid-cols-2 flex-col gap-5">

          {mappedReservations && mappedReservations.length === 0 && (
          <h1 className="text-3xl text-[#0E8388]">NO Reservations Yet</h1>
          )}
          {mappedReservations
          && mappedReservations.map((reservation) => (
            <section
              className="reservations-section border rounded-3xl bg-[#0E8388] bg-opacity-30 hover:bg-opacity-50 p-5"
              key={reservation.id}
            >
              <div className="reservation-header">
                <h1 className="text-xl">
                  Title:
                  <span className="ml-2">{reservation.title}</span>
                </h1>
                <h3>
                  Date:
                  <span className="ml-2">{reservation.reservation_date}</span>
                </h3>
              </div>
              <div className="flex mt-5">
                <div className="flex-col gap-4">
                  <h4>
                    Doctor:
                    <span className="ml-2">{reservation.doctor_name}</span>
                  </h4>
                  <h4>
                    <b>Purpose:</b>
                    <span className="ml-2">{reservation.purpose}</span>
                  </h4>
                </div>
                <div className="flex-col gap-4">
                  <h3>
                    Location:
                    <span className="ml-2">{reservation.location}</span>
                  </h3>
                  <h4>
                    Contact:
                    <span className="ml-2">{reservation.phone_number}</span>
                  </h4>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyReservations;
