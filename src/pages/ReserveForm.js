import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import doc from '../assets/doc_img.jpg';
import '../styles/reservation-form.css';

const ReserveForm = () => {
  const [title, setTitle] = useState('');
  const [reservation, setreservation] = useState('');
  const [phonenumber, setPhonenumber] = useState('e.g. 1234567890');
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState('');
  const [doctorsName, setDoctorsname] = useState('');
  const webLocation = useLocation();
  const searchParams = new URLSearchParams(webLocation.search);
  const username = searchParams.get('username');
  const encodedUsername = encodeURIComponent(username);
  const body = document.getElementById('body');

  const handleChange = (event) => {
    const selectedDoctor = event.target.value;
    setDoctorsname(selectedDoctor);
  }

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      title,
      reservation_date: reservation,
      phone_number: phonenumber,
      purpose,
      location,
      doctor_name: doctorsName,
      username,
    };
    if (data.title === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a title.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.reservation_date === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a reservation date.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.phone_number.length !== 8) {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a valid phone number. It must be 8 characters';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.purpose === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a purpose.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.location === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a location.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.doctor_name === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass text-red-500';
      errorEl.innerHTML = 'Please enter a doctor name.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else {
      const url = 'http://localhost:3000/api/reservations';
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            const apiError = document.createElement('div');
            apiError.innerHTML = data.errors;
          } else if (data.success === true) {
            // Clear all inputs
            // show success message to the user
            const body = document.querySelector('#root');
            const apiSuccess = document.createElement('div');
            apiSuccess.innerHTML = '<h4>Account has been created succesfully</h4>';
            body.appendChild(apiSuccess);
            setTimeout(() => {
              apiSuccess.remove();
            }, 10000);
            // refresh
            window.location.reload();
          } else {
            // handle other cases
            const apiOtherError = document.createElement('div');
            apiOtherError.innerHTML = `
              <h4>
                There seem to be a problem with the server. Please try again later!
              </h4>
            `;
            body.appendChild(apiOtherError);
            setTimeout(() => {
              apiOtherError.remove();
            }, 5000);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          // show error message to the user
        });
    }
  };
  return (
    <div
      className="bg-black h-screen flex justify-center items-center flex-col"
      style={{
        backgroundImage: `url(${doc})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <NavLink
        className="mt-40 md:mt-5 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        to={`/landingPage?username=${encodedUsername}`}
      >
        Back
      </NavLink>
      <div className="container my-5 md:pl-48 lg:ml-0 flex justify-center items-center flex-col gap-16 w-screen">
        <form
          className="border-black border-2 bg-[#CBE4DE] bg-opacity-30 rounded-lg p-5 md:p-20 flex flex-col lg:w-1/2 w-11/12 md:gap-5 gap-3 shadow-2xl"
          onSubmit={submitHandeller}
        >
          <label
            className=" block mb-2 text-lg font-medium text-gray-900"
            htmlFor="title"
          >
            Title
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>

          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="reservation"
          >
            Reservation Date
            <input
              type="text"
              placeholder="ex. 2-2-2022"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="reservation"
              onChange={(e) => {
                setreservation(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="phonenumber"
          >
            Phone Number
            <input
              type="number"
              name="phonenumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
          </label>

          <label
            className="text-gray-900 mb-2 text-lg font-medium rounded-lg flex flex-col"
            htmlFor="purpose"
          >
            Purpose
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="purpose"
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
            />
          </label>

          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="location"
          >
            Location
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            style={{ appearance: 'none' }}
            onChange={handleChange}
          >
            <option value="">Choose A Doctor</option>
            <option value="Doctor Kelvin Ben">Doctor Kelvin Ben</option>
            <option value="Doctor Abdullah Nganje">Doctor Abdullah Nganje</option>
            <option value="Doctor Mohammed El-Deeb">
              Doctor Mohammed El-Deeb
            </option>
            <option value="Doctor Abubakar Ummar">Doctor Abubakar Ummar</option>
          </select>
          <div id="EM" />
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit"
          >
            Reserve
          </button>
        </form>
      </div>

    </div>
  );
}

export default ReserveForm;
