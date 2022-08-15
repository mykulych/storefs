import React from 'react';
import { Orders, PersonalData, PublishedAds, Wishlist } from '../components/ui';

const cabinetRoutes = [
  {
    path: '/cabinet/personal-data',
    element: <PersonalData />,
  },
  {
    path: '/cabinet/orders',
    element: <Orders />,
  },
  {
    path: '/cabinet/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/cabinet/published-ads',
    element: <PublishedAds />,
  },
];

export default cabinetRoutes;
