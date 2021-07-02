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
import Footer from '../../components/Footer';

function treeWidth( tree ) {
  let cnt = 0;

  for( const child of tree.next ) {
    cnt += treeWidth(child);
  }

  return cnt || 1;
}

export default function Tree({ tree, id_recipe }) {
  useEffect(() => {
    const f = async () => {

    };

    f();
  }, []);

  const styling = {
    backgroundImage: `url(${tomatoImg})`, //あとで"/tomato.jpg"に戻す
    width:"100%",
    marginTop: '6rem',
    overflowX: 'scroll'
  };

  const treeStyling = {
    width: `${(200+80)*Math.max(1, treeWidth(tree))}px`
  };

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>
            レシピツリー
          </h1>
          <div style={styling}>
            {tree && (<div className="tree" style={treeStyling}><ul>
              <TreeComponent key={tree.id} source={id_recipe} {...tree} />
            </ul></div>)}
          </div>
          <Grid container alignItems="center" justify="center" style={{ margin: '2rem' }}>
            <Grid item xs={6} sm={4} md={3} style={{ textAlign: "center" }}>
              <Link href={`/`}>
                <Button variant="contained" color="primary">
                  レシピ一覧
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={3} style={{ textAlign: "center" }}>
              <Link href={`/recipe/${id_recipe}`}>
                <Button variant="contained" color="primary">
                  レシピに戻る
                </Button>
              </Link>
            </Grid>
          </Grid>
        </main>
        <Footer />
      </body>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { id: id_recipe } = query;

  const { data } = await fetchTree(id_recipe);

  return { props: { tree: data, id_recipe } }
}