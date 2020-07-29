import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase, db, setupPresence } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Router>
        <Nav user={user} />
        <Switch>
          <Route path="/channel/:channelId">
            <Channel user={user} />
          </Route>
          <Redirect from="/" to="/channel/general" />
        </Switch>
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const [authError, setAuthError] = useState();

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="login">
      <h1>Chat</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was an error</p>
          <p>{authError.message}</p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}

function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          uid: firebaseUser.uid,
          photoUrl: firebaseUser.photoURL,
        };
        setUser(user);

        db.collection('users').doc(user.uid).set(user, { merge: true });

        setupPresence(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

export default App;
