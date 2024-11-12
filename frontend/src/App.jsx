import React from 'react';
import { useLocation } from 'react-router-dom';
import Routing from './utils/Routing';
import Navbar from './components/Navbar';

const App = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];


  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routing />
    </>
  );
};

export default App;