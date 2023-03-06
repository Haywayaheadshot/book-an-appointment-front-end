import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function LogIn() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      user: {
        password,
        username,
      },
    };
    if (data.user.username === '') {
      // Show error message
      // nameErrorMessage.style.display = 'block';
      // emailErrorMessage.style.display = 'none';
      // passErrorMessage.style.display = 'none';
      // userErrorMessage.style.display = 'none';
    } else if (data.user.password.length < 6) {
      // show error message
      // nameErrorMessage.style.display = 'none';
      // emailErrorMessage.style.display = 'none';
      // passErrorMessage.style.display = 'block';
      // userErrorMessage.style.display = 'none';
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
          // eslint-disable-next-line
          console.error(data);
          const form = document.querySelector('.sign-up-form');
          if (data.status === 401) {
            const apiError = document.createElement('div');
            apiError.innerHTML = data.errors;
            form.appendChild(apiError);
            setTimeout(() => {
              apiError.remove();
            }, 5000);
          } else if (data.status === 200) {
            // Clear all inputs
            setPassword('');
            setUsername('');
            // show success message to the user
            const body = document.querySelector('#root');
            const apiSuccess = document.createElement('div');
            apiSuccess.innerHTML = '<h4>Log in succesfully</h4>';
            body.appendChild(apiSuccess);
            setTimeout(() => {
              apiSuccess.remove();
            }, 10000);
            // redirect to a new page
            // window.location.href = '/logInPage';
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

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
