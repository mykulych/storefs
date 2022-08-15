import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalState } from './context';
import { AccountUploader, ErrorHandler } from './hoc';

function App() {
  return (
    <ModalState>
      <AccountUploader>
        <ErrorHandler>
          {useRoutes(routes)}
          <ToastContainer />
        </ErrorHandler>
      </AccountUploader>
    </ModalState>
  );
}

export default App;
