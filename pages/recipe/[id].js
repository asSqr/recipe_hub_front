import { Button, TextField, TextareaAutosize, Grid } from '@material-ui/core'
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipe, deleteRecipe, postFork } from '../../utils/api_request';
// import RecipeItem from '../../components/RecipeItem';
import RecipeItem from '../../components/preview';
import Auth from '../../components/Auth';
import Header from '../../components/Header';
import firebase from '../../firebase/firebase';
import Meta from '../../components/Meta';
import { appOrigin } from '../../utils/constants';
import { useAuth } from '../../utils/auth';

export default function Recipe({ recipe, id_recipe }) {
  const nameRef = React.createRef();
  const titleRef = React.createRef();
  const recipeRef = React.createRef();
  const router = useRouter();

  const { user } = useAuth();

  const clickHandler = async () => {
    if( !recipe || !user )
      return;
    
    const { data: { id } } = await postFork({
      id_user: user.id,
      id_repo: id_recipe,
      author_name: user.user_name,
      author_photo_url: user.photo_url
    });

    router.push(`/edit/${id + 'z'}`);
  }

  const deleteHandler = async () => {
    if( !recipe )
      return;
    
    await deleteRecipe(
      id_recipe
    );

    router.push(`/`);
  }

  return (
    <div>
      <Meta image_url={recipe && recipe.thumbnail ? recipe.thumbnail : `${appOrigin}/noimage_transparent.png`} />
      <Header user={user} />
      <main className={styles.main}>
        <h1 className={styles.title}>
          レシピ
        </h1>

        {recipe && (<div style={{ margin: '4rem' }}>
          <RecipeItem key={id_recipe} show_link={false} {...recipe} />
        </div>)}

        <form style={{ margin: '2rem', flexDirection: 'row', justifyContent: 'center', }} noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
          {/* <TextField
            id="standard-basic"
            label="レシピ名"
            inputRef={titleRef}
            color="primary"
            focused
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> <br />
          <TextField
            id="standard-basic"
            label="レシピ"
            inputRef={recipeRef}
            color="primary"
            focused
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> <br />
          <TextField
            id="standard-basic"
            label="料理名"
            inputRef={nameRef}
            color="primary"
            focused
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> <br /> */}
            {user && (<Button 
              variant="contained"
              color="primary"
              onClick={clickHandler}
              style={{marginLeft: '2rem'}}
            >
              派生レシピを作る
            </Button>)}
            {user && recipe && user.id === recipe.id_author && (<Button 
              variant="contained"
              color="primary"
              onClick={deleteHandler}
              style={{marginLeft: '2rem'}}
            >
              レシピ削除
            </Button>)}
          </Grid>
        </form>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
          {user && recipe && user.id === recipe.id_author && (<Link href={`/edit/${id_recipe}`}><Button 
              variant="contained"
              color="primary"
              style={{margin: '2rem'}}
            >
            レシピ編集画面へ
          </Button></Link>)}
          <Link href="/"><Button 
              variant="contained"
              color="primary"
              style={{margin: '2rem'}}
            >
            レシピ一覧へ
          </Button></Link>
          <Link href={`/tree/${id_recipe}`}><Button 
              variant="contained"
              color="primary"
              style={{margin: '2rem'}}
            >
            レシピツリー画面へ
          </Button></Link>
        </Grid>
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { id: id_recipe } = query;

  const { data } = await fetchRecipe(id_recipe);

  return { props: { recipe: data, id_recipe } }
}