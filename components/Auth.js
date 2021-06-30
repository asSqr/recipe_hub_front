import { useEffect } from 'react';
import firebase from '../firebase/firebase';
import Router from 'next/router';
import { useAuth } from '../utils/auth';

const Auth = () => {
  const { user } = useAuth();

  useEffect(() => {
    if( !user ) {
      Router.push('/login'); 
    }
  }, []);

  return (
    <></>
  );
};

export default Auth;