import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sign-up.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [username, setUsername] = useState('');

  const nameErrorMessage = document.querySelector('.sign-up-name-error');
  const emailErrorMessage = document.querySelector('.sign-up-email-error');
  const passErrorMessage = document.querySelector('.sign-up-password-error');
  const userErrorMessage = document.querySelector('.sign-up-username-error');

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      user: {
        name,
        email,
        password,
        username,
        photo: photo || 'default-avatar.png', // set default image path if photo is empty
      },
    };
    if (data.user.name === '') {
      // Show error message
      nameErrorMessage.style.display = 'block';
      emailErrorMessage.style.display = 'none';
      passErrorMessage.style.display = 'none';
      userErrorMessage.style.display = 'none';
    } else if (data.user.email === '' || !data.user.email.includes('@')) {
      // show error message
      nameErrorMessage.style.display = 'none';
      emailErrorMessage.style.display = 'block';
      passErrorMessage.style.display = 'none';
      userErrorMessage.style.display = 'none';
    } else if (data.user.password.length < 6) {
      // show error message
      nameErrorMessage.style.display = 'none';
      emailErrorMessage.style.display = 'none';
      passErrorMessage.style.display = 'block';
      userErrorMessage.style.display = 'none';
    } else if ((data.user.username === '') || (data.user.username.length < 5)) {
      // show error message
      nameErrorMessage.style.display = 'none';
      emailErrorMessage.style.display = 'none';
      passErrorMessage.style.display = 'none';
      userErrorMessage.style.display = 'block';
    } else {
      const url = 'http://localhost:3000/api/signup';
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
          if (data.success === false) {
            const apiError = document.createElement('div');
            apiError.innerHTML = data.errors;
            form.appendChild(apiError);
            setTimeout(() => {
              apiError.remove();
            }, 5000);
          } else if (data.success === true) {
            // Clear all inputs
            setName('');
            setEmail('');
            setPassword('');
            setPhoto('');
            setUsername('');
            // show success message to the user
            const body = document.querySelector('#root');
            const apiSuccess = document.createElement('div');
            apiSuccess.innerHTML = '<h4>Account has been created succesfully</h4>';
            body.appendChild(apiSuccess);
            setTimeout(() => {
              apiSuccess.remove();
            }, 10000);
            // redirect to a new page
            window.location.href = '/logInPage';
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
      <form className="sign-up-form" onSubmit={submitHandeller}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <h2 className="sign-up-name-error">
            Please input your name!
          </h2>
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h2 className="sign-up-email-error">
            Please input a correct email!
          </h2>
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
          <h2 className="sign-up-password-error">
            Your passoword should be atleast 6 characters!
          </h2>
        </label>

        <label htmlFor="photo">
          Photo
          <input
            type="file"
            name="photo"
            onChange={(e) => {
              setPhoto(e.target.value);
            }}
          />
        </label>

        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <h2 className="sign-up-username-error">
            Please use a Username that has atleast 5 characters!
          </h2>
        </label>
        <button type="submit">
          Sign up
        </button>
      </form>
      <section>
        <h3>
          Already have an account?
        </h3>
        <NavLink to="./logInPage">
          <button type="button">
            Login
          </button>
        </NavLink>
      </section>
    </div>
  );
}

export default SignUp;
