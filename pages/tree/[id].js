import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import { fetchTree } from '/utils/api_request';
import { useEffect, useState } from 'react';
import { TreeComponent } from '../../components/TreeComponent'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Header from '../../components/Header';
import Head from 'next/head';
import { appOrigin } from '../../utils/constants';
import Meta from '../../components/Meta';
import tomatoImg from '../../public/tomato.jpg';
import { sleep } from '../../utils/utils';

export default function Tree({ tree, id_recipe, user }) {
  useEffect(() => {
    const f = async () => {

    };

    f();
  }, []);

  const styling = {
    backgroundImage: `url(${tomatoImg})`, //あとで"/tomato.jpg"に戻す
    width:"100%",
    marginTop: '6rem'
  }

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <Header {...user} />
      <main className={styles.main}>
        <h1 className={styles.title}>
          レシピツリー
        </h1>
        <div style={styling}>
          {tree && (<ul className="construction">
            <TreeComponent key={tree.id} source={id_recipe} {...tree} />
          </ul>)}
        </div>
        <Grid container alignItems="center" justify="center" style={{margin: '2rem'}}>
            <Grid item xs={6} style={{textAlign: "center"}}>
              <Link href={`/recipe/${id_recipe}`}>
                <Button variant="contained" color="primary">
                  レシピに戻る
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} style={{textAlign: "center"}}>
              <Link href={`/`}>
                <Button variant="contained" color="primary">
                  レシピ一覧
                </Button>
              </Link>
            </Grid>
          </Grid>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { id: id_recipe } = query;

  const { data } = await fetchTree(id_recipe);

  let userObj = null;

  firebase.auth().onAuthStateChanged(user => {
    if( user ) {
      userObj = { user_name: user.displayName || 'ユーザー名なし', photo_url: user.photoURL, id: user.uid };
    }
  })

  return { props: { tree: data, id_recipe, user: userObj } }
}