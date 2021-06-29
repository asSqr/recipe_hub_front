import Editor from '../components/EditorComponent';
import { postRecipe } from '../utils/api_request';
import Auth from '../components/Auth';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';
import Head from 'next/head';
import { appOrigin } from '../utils/constants';
import Meta from '../components/Meta';

export default function CreateRecipe() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if( user ) {
        setUser({ user_name: user.displayName || 'ユーザー名なし', photo_url: user.photoURL, id: user.uid });
      }
    })
  }, []);

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <Auth />
      <Header />
      {user && (<Editor apiFunc={postRecipe} title="レシピを作る" action="レシピ作成" user={user} />)}
    </>
  );
};
