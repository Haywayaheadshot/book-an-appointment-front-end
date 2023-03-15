import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import doc from '../assets/doc_img.jpg';

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      user: {
        password,
        username,
      },
    };
    if (data.user.username === '') {
      setLoginError('Username cannot be empty!');
    } else if (data.user.password.length < 6) {
      setLoginError(
        'Password must be 6 characters or more. Please check again!',
      );
    } else {
      const url = 'http://localhost:3000/api/login';
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
          const form = document.querySelector('.sign-up-form');
          if (data.message === 'success') {
            // redirect to user page
            const encodedUsername = encodeURIComponent(username);
            navigate(`/landingPage?username=${encodedUsername}`);
          } else {
            // handle other cases
            const apiOtherError = document.createElement('div');
            apiOtherError.innerHTML = data.error;
            form.appendChild(apiOtherError);
            setTimeout(() => {
              apiOtherError.remove();
            }, 5000);
          }
        });
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen"
      style={{
        backgroundImage: `url(${doc})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <NavLink to="../">
        <button
          type="button"
          className="mt-5 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Back
        </button>
      </NavLink>
      <div className="container my-5 flex justify-center items-center flex-col gap-16 w-screen h-96">
        <form
          className="border-black border-2 bg-[#0E8388] bg-opacity-30 rounded-lg w-11/12 mx-28 md:p-20 p-5 flex flex-col md:w-1/2 gap-5 shadow-2xl"
          onSubmit={submitHandeller}
        >
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          {loginError && <h4>{loginError}</h4>}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
      <section>
        <NavLink to="/">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Sign Up
          </button>
        </NavLink>
      </section>
    </div>
  );
}

export default LogIn;
