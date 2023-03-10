import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function LogIn() {
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
      setLoginError('Password must be 6 characters or more. Please check again!');
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
    <div>
      <NavLink to="../">
        <button type="button">
          Back
        </button>
      </NavLink>
      <form className="sign-up-form" onSubmit={submitHandeller}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {loginError && <h4>{loginError}</h4>}
        <button type="submit">
          Login
        </button>
      </form>
      <section>
        <NavLink to="/">
          <button type="button">
            Sign Up
          </button>
        </NavLink>
      </section>
    </div>
  );
}

export default LogIn;
