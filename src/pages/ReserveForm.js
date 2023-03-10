import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import doc from '../assets/doc_img.jpg';

function ReserveForm() {
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
  const form = document.querySelector('.reservations-form');

  function handleChange(event) {
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
      errorEl.innerHTML = 'Please enter a title.';
      errorEl.classList.add('error');
      form.appendChild(errorEl);
    } else if (data.reservation_date === '') {
      const errorEl = document.createElement('p');
      errorEl.innerHTML = 'Please enter a reservation date.';
      errorEl.classList.add('error');
      form.appendChild(errorEl);
    } else if (data.phone_number.length < 8) {
      const errorEl = document.createElement('p');
      errorEl.innerHTML = 'Please enter a valid phone number.';
      errorEl.classList.add('error');
      form.appendChild(errorEl);
    } else if (data.purpose === '') {
      const errorEl = document.createElement('p');
      errorEl.innerHTML = 'Please enter a purpose.';
      errorEl.classList.add('error');
      form.appendChild(errorEl);
    } else if (data.location === '') {
      const errorEl = document.createElement('p');
      errorEl.innerHTML = 'Please enter a location.';
      errorEl.classList.add('error');
      form.appendChild(errorEl);
    } else if (data.doctor_name === '') {
      const errorEl = document.createElement('p');
      errorEl.innerHTML = 'Please enter a doctor name.';
      errorEl.classList.add('error');
      form.appendChild(errorEl);
    } else {
      const url = 'http://localhost:3000/api/reservations';
      console.log(data);
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
            form.appendChild(apiError);
            setTimeout(() => {
              apiError.remove();
            }, 5000);
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
            form.appendChild(apiOtherError);
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
    <div style={{
      backgroundImage: `url(${doc})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <NavLink to={`/landingPage?username=${encodedUsername}`}>
        <button
          className="mt-5 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          type="button"
        >
          Back
        </button>
      </NavLink>
      <div className="container my-5 flex justify-center items-center flex-col gap-16 w-screen">
        <form
          className="border-black border-2 rounded-lg p-20 flex flex-col w-1/2 gap-5 shadow-2xl"
          onSubmit={submitHandeller}
        >
          <label
            className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="title"
          >
            title
            <input
              type="text"
              className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>

          <label
            className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="reservation"
          >
            reservation date
            <input
              type="text"
              className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
              name="reservation"
              onChange={(e) => {
                setreservation(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="phonenumber"
          >
            phonenumber
            <input
              type="number"
              name="phonenumber"
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
          </label>

          <label
            className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="purpose"
          >
            purpose
            <input
              type="text"
              className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
              name="purpose"
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
            />
          </label>

          <label
            className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="location"
          >
            location
            <input
              type="text"
              className=" mb-2 text-sm font-medium text-gray-900 rounded-lg flex flex-col"
              name="location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </label>
          <select onChange={handleChange}>
            <option value="">Choose A Doctor</option>
            <option value="Doctor Kelvin Ben">Doctor Kelvin Ben</option>
            <option value="Doctor Abdullah Nganje">Doctor Abdullah Nganje</option>
            <option value="Doctor Mohammed El-Deeb">
              Doctor Mohammed El-Deeb
            </option>
            <option value="Doctor Abubakar Ummar">Doctor Abubakar Ummar</option>
          </select>

          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>

    </div>
  );
}

export default ReserveForm;
