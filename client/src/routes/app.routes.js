import React from 'react';
import { PrivateRoute } from '../hoc';
import { Catalog, Main, MockData, NotFound, PostAd, EditAd, ResultPage, UserCabinet, AdDetails } from '../pages';
import cabinetRoutes from './cabinet.routes';

const appRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/:adId',
    element: <AdDetails />,
  },
  {
    path: '/post-new-ad',
    element: (
      <PrivateRoute>
        <PostAd />
      </PrivateRoute>
    ),
  },
  {
    path: '/:id/edit',
    element: (
      <PrivateRoute>
        <EditAd />
      </PrivateRoute>
    ),
  },
  {
    path: '/catalog/:mainCategory',
    element: <Catalog />,
  },
  {
    path: '/catalog/:mainCategory/:subCategory',
    element: <Catalog />,
  },
  {
    path: '/cabinet',
    element: (
      <PrivateRoute>
        <UserCabinet />
      </PrivateRoute>
    ),
    children: cabinetRoutes,
  },
  {
    path: '/mockdata',
    element: <MockData />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/result/:status',
    element: <ResultPage />,
  },
];

export default appRoutes;
