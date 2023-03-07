import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function LogIn() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const loginUserError = document.querySelector('.login-username-error');
  const loginPasswordError = document.querySelector('.login-password-error');

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      user: {
        password,
        username,
      },
    };
    if (data.user.username === '') {
      loginUserError.style.display = 'block';
      loginPasswordError.style.display = 'none';
    } else if (data.user.password.length < 6) {
      loginUserError.style.display = 'none';
      loginPasswordError.style.display = 'block';
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
            window.location.href = `/landingPage?username=${encodedUsername}`;
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
          <h4 className="login-username-error">
            Username cannot be empty!
          </h4>
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
          <h4 className="login-password-error">
            Password must be 6 characters or more.
            <br />
            Please check again!
          </h4>
        </label>
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
