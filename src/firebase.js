import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
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
const rtdb = firebase.database();

function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async (snapshot) => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore,
    });
  });
}

export { db, firebase, setupPresence };
