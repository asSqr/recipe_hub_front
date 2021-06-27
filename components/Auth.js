import { useEffect } from 'react';
import firebase from '../firebase/firebase';
import Router from 'next/router';

const Auth = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if( user ) {
        console.log(user);

        localStorage.setItem('user', JSON.stringify({ user_name: user.displayName, photo_url: user.photoURL, id: user.uid }));
      } else {
        Router.push('/login'); 
      }
    })
  }, []);

  return (
    <></>
  );
};

export default Auth;