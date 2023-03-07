import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

function Details() {
  const params = useParams();
  return (
    <div>
      <NavLink to="../">
        <button type="button">
          Back
        </button>
      </NavLink>
      <h1>
        Pop Up for clicked doc
        {params}
      </h1>
    </div>
  );
}

export default Details;
