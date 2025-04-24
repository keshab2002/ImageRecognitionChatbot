import React from 'react';
import Header from './components/Header.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';

const Layout = () => {
  // Mock user data for testing
  const user = { name: "John Doe" };

  // Mock onLogout function (for now, doesn't do anything)
  const onLogout = () => {
    console.log("Logged out!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={onLogout} />
        <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
