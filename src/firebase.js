import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAv2MiCVWjTjXzxRPTq-a5cQWC8QEkMNxc',
  authDomain: 'chat-app-48e15.firebaseapp.com',
  databaseURL: 'https://chat-app-48e15.firebaseio.com',
  projectId: 'chat-app-48e15',
  storageBucket: 'chat-app-48e15.appspot.com',
  messagingSenderId: '538929990858',
  appId: '1:538929990858:web:e6f6b1d933af2dabcd7833',
  measurementId: 'G-0BBY91TVMN',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
