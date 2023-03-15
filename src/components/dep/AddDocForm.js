import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import doc from '../../assets/doc_img.jpg';

function AddDocForm() {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [locationOfWork, setLocationOfWork] = useState('');
  const [photo, setPhoto] = useState('');

  const webLocation = useLocation();
  const searchParams = new URLSearchParams(webLocation.search);
  const username = searchParams.get('username');
  const encodedUsername = encodeURIComponent(username);

  const navigate = useNavigate();

  if (!encodedUsername) {
    navigate('/');
  }

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      name,
      specialty,
      yearsOfExperience,
      bio,
      age,
      qualifications,
      locationOfWork,
      photo: photo || 'default-avatar.png',
    };
    if (data.name === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a name.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.specialty === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a specialty.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.yearsOfExperience === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter Years of experience!';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.bio === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter bio of doctor.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.age === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass';
      errorEl.innerHTML = 'Please enter a age in integer.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.qualifications === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass text-red-500';
      errorEl.innerHTML = 'Please enter a qualification.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else if (data.locationOfWork === '') {
      const errorEl = document.createElement('p');
      errorEl.className = 'apiErrorClass text-red-500';
      errorEl.innerHTML = 'Please enter a Location of work.';
      errorEl.classList.add('error');
      document.querySelector('#EM').appendChild(errorEl);
      setTimeout(() => {
        errorEl.remove();
      }, 1000);
    } else {
      const url = 'http://localhost:3000/api/doctors';
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
            apiSuccess.innerHTML = '<h4>Doctor has been created succesfully</h4>';
            body.appendChild(apiSuccess);
            setTimeout(() => {
              apiSuccess.remove();
            }, 10000);
            // refresh
            window.location.reload();
          } else {
            // handle other cases
            const body = document.querySelector('#root');
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
            htmlFor="name"
            placeholder="E.g. JOhn"
          >
            Name
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="specialty"
          >
            Specialty
            <input
              type="text"
              placeholder="E.g. Surgeon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="specialty"
              onChange={(e) => {
                setSpecialty(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="experience"
          >
            Years Of experience
            <input
              type="number"
              placeholder="E.g. 5"
              name="experience"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setYearsOfExperience(e.target.value);
              }}
            />
          </label>
          <label
            className="text-gray-900 mb-2 text-lg font-medium rounded-lg flex flex-col"
            htmlFor="bio"
          >
            Bio
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="age"
          >
            Age
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="age"
              placeholder="E.g. 5"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="qualifications"
          >
            Qualifications
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="qualifications"
              onChange={(e) => {
                setQualifications(e.target.value);
              }}
            />
          </label>
          <label
            className=" mb-2 text-lg font-medium text-gray-900 rounded-lg flex flex-col"
            htmlFor="location"
          >
            Location of work
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="location"
              onChange={(e) => {
                setLocationOfWork(e.target.value);
              }}
            />
          </label>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="photo"
          >
            Photo
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="file"
              name="photo"
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
            />
          </label>
          <div id="EM" />
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>

    </div>
  );
}

export default AddDocForm;
