import React from 'react';
import NavBar from './NavBar';

function NavBarWrapper({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default NavBarWrapper;
