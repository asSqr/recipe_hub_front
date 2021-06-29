import { useEffect } from 'react';
import firebase from '../firebase/firebase';
import Router from 'next/router';

const Auth = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if( user ) {
        // console.log(user);
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