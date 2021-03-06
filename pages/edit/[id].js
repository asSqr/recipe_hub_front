import Editor from '../../components/EditorComponent';
import { fetchRecipe, patchRecipe, deleteRecipe, fecthImages } from '../../utils/api_request';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import Auth from '../../components/Auth';
import Header from '../../components/Header';
import firebase from '../../firebase/firebase';
import Head from 'next/head';
import { appOrigin } from '../../utils/constants';
import Meta from '../../components/Meta';
import { useAuth } from '../../utils/auth';
import Footer from '../../components/Footer';

export default function EditRecipe({ recipe, id_repo, forkFlag, id_recipe }) {
  const router = useRouter();

  const { user } = useAuth();

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <Auth />
      <body className={styles.body}>
        <Header />
        {recipe && user && (
          <main className={styles.main} >
            <Editor apiFunc={patchRecipe} title="レシピを編集" action={forkFlag ? "レシピ作成" : "レシピ更新"} initObj={recipe} forkFlag={forkFlag} id_recipe={id_recipe.endsWith('z') ? id_recipe.slice(0, id_recipe.length - 1) : id_recipe} user={user} />
          </main>
        )}
        <Footer />
      </body>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { id: id_recipe } = query;

  let forkFlag = false;
  let id_repo = id_recipe;

  if( id_recipe.endsWith('z') ) {
    forkFlag = true;

    id_repo = id_recipe.slice(0, id_recipe.length-1);
  }

  const { data } = await fetchRecipe(id_recipe.endsWith('z') ? id_recipe.slice(0, id_recipe.length-1) : id_recipe);

  const recipe = data;

  return { props: { recipe, id_repo, forkFlag, id_recipe } }
}