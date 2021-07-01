import Editor from '../components/EditorComponent';
import { postRecipe } from '../utils/api_request';
import Auth from '../components/Auth';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';
import Head from 'next/head';
import { appOrigin } from '../utils/constants';
import Meta from '../components/Meta';
import { useAuth } from '../utils/auth';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css'

export default function CreateRecipe() {
  const { user } = useAuth();

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <Auth user={user} />
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>
          <div style={{overflowX: 'scroll'}}>
            {user && (<Editor apiFunc={postRecipe} title="レシピを作る" action="レシピ作成" user={user} />)}
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};
