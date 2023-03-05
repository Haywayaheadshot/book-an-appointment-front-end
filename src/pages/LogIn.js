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
      <h2>Login Page</h2>
    </div>
  );
}

export default LogIn;
