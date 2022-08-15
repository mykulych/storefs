import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAgbFgJwA3RSCBL0yGt4GL5NOd1CIFaMY0',
  authDomain: 'store-ddd1a.firebaseapp.com',
  databaseURL: 'https://store-ddd1a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'store-ddd1a',
  storageBucket: 'store-ddd1a.appspot.com',
  messagingSenderId: '1032892072471',
  appId: '1:1032892072471:web:90faa2de1e8e4b10795252',
};

const firebaseService = initializeApp(firebaseConfig);

export default firebaseService;
