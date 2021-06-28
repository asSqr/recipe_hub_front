import Editor from '../components/EditorComponent';
import { postRecipe } from '../utils/api_request';
import Auth from '../components/Auth';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';

export default function CreateRecipe() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if( user ) {
        setUser({ user_name: user.displayName || user.email, photo_url: user.photoURL, id: user.uid });
      }
    })
  }, []);

  return (
    <>
      <Auth />
      <Header />
      {user && (<Editor apiFunc={postRecipe} title="レシピを作る" action="レシピ作成" user={user} />)}
    </>
  );
};
