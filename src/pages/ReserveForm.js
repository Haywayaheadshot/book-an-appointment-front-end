import React, { useState } from 'react';

function ReserveForm() {
  const [title, setTitle] = useState('');
  const [reservation, setreservation] = useState('');
  const [phonenumber, setPhonenumber] = useState('e.g. 1234567890');
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState('');
  const [doctorsname, setDoctorsname] = useState('');

  const submitHandeller = (e) => {
    e.preventDefault();
    const data = {
      user: {
        title,
        reservation,
        phonenumber,
        purpose,
        location,
        doctorsname,
      },
    };
    if (data.user.name === '') {
      // Show error message
    } else if (data.user.email === '' || !data.user.email.includes('@')) {
      // show error message
    } else if (data.user.password.length < 6) {
      // show error message

    } else if ((data.user.username === '') || (data.user.username.length < 5)) {
      // show error message
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
          // eslint-disable-next-line
          console.error(data);
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
    <form className="sign-up-form" onSubmit={submitHandeller}>
      <label htmlFor="title">
        title
        <input
          type="text"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>

      <label htmlFor="reservation">
        reservation date
        <input
          type="text"
          name="reservation"
          onChange={(e) => {
            setreservation(e.target.value);
          }}
        />
      </label>
      <label htmlFor="phonenumber">
        phonenumber
        <input
          type="number"
          name="phonenumber"
          onChange={(e) => {
            setPhonenumber(e.target.value);
          }}
        />
      </label>

      <label htmlFor="purpose">
        purpose
        <input
          type="text"
          name="purpose"
          onChange={(e) => {
            setPurpose(e.target.value);
          }}
        />
      </label>

      <label htmlFor="location">
        location
        <input
          type="text"
          name="location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </label>
      <label htmlFor="doctor's name">
        Doctor&apos;s name
        <input
          type="text"
          name="doctor's name"
          onChange={(e) => {
            setDoctorsname(e.target.value);
          }}
        />
      </label>
      <button type="submit">
        Sign up
      </button>
    </form>
  );
}

export default ReserveForm;
