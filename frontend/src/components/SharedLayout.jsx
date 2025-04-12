import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SharedLayout = () => {
  return (
    <div className="app">
      <main className="main-content">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default SharedLayout; 