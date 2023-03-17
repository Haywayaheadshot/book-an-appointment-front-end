import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DeleteDocs = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/doctors/${id}`)
      .then((response) => {
        if (response.message === 'success') {
        // const body = document.getElementById('body');
        // const sucessMessage = document.createElement('p');
        // sucessMessage.innerHTML = response.data;
        // body.appendChild(sucessMessage);
          window.location.reload();
        } else {
          const body = document.getElementById('body');
          const errorMessage = document.createElement('p');
          errorMessage.innerHTML = `
          Sorry! There's something wrong with the server at this moment.
          Try again later
          `;
          body.appendChild(errorMessage);
          setTimeout(() => {
            errorMessage.remove();
          }, 5000);
        }
      });
  };

  return (
    <section>
      <button
        type="button"
        onClick={handleDelete}
        className="mb-10 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-32 sm:w-32 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Delete
      </button>
    </section>
  );
};

export default DeleteDocs;

DeleteDocs.propTypes = {
  id: PropTypes.number.isRequired,
};
