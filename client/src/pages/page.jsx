import React from 'react';
import Header from '../components/layout';
import { Outlet } from 'react-router-dom';
import { Modal } from '../components/common';

function Page() {
  return (
    <div>
      <Header />
      <Modal />
      <Outlet />
    </div>
  );
}

export default Page;
