import React, { useState } from 'react';
import { auth, googleProvider } from '@/config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setEmail('');
      await setPassword('');
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {auth.currentUser?.uid != undefined ? (
        <h1>Welcome {auth.currentUser?.displayName}</h1>
      ) : (
        <h1>Please Sign In</h1>
      )}
      <input
        placeholder="Email.."
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password.."
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In </button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
