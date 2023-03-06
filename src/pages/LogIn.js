import React from 'react';
import { NavLink } from 'react-router-dom';

function LogIn() {
  return (
    <div>
      <NavLink to="../">
        <button type="button">
          Back
        </button>
      </NavLink>
      <form className="sign-up-form">
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
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
