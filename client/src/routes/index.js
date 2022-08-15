import React from 'react';
import Page from '../pages';
import appRoutes from './app.routes';

const routes = [
  {
    path: '/',
    element: <Page />,
    children: appRoutes,
  },
];

export default routes;
