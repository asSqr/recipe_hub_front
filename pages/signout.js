import { useEffect } from 'react';
import firebase from '../firebase/firebase';
import Router from 'next/router';

export default function SignoutPage() {
  useEffect(() => {
    firebase.auth()
      .signOut()
      .then(() => {
        Router.push('/');
      })
      .catch(error => {

      });
  }, []);

  return (
    <></>
  );
};