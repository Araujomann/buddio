import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBb0cIIiKdatwvybwcBq6imHeKva7Iq5FM',
    authDomain: 'buddio-8194f.firebaseapp.com',
    projectId: 'buddio-8194f',
    storageBucket: 'buddio-8194f.firebasestorage.app',
    messagingSenderId: '78891245479',
    appId: '1:78891245479:web:538ddc7d6b43a9563ce082',
    measurementId: 'G-L9MFGGD1ZY',
};

export const App = initializeApp(firebaseConfig);
