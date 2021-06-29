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

export default function Tree() {
  const [tree, setTree] = useState(null);

  const router = useRouter();
  const { id: id_recipe } = router.query;

  useEffect(() => {
    const f = async () => {
      if (!id_recipe)
        return;

      const { data } = await fetchTree(id_recipe);

      setTree(data);
    };

    f();
  }, [id_recipe]);

  const styling = {
    backgroundImage: 'url("https://raw.githubusercontent.com/asSqr/recipe_hub_front/feature/recipes/public/tomato.jpg")', //あとで"/tomato.jpg"に戻す
    width:"100%",
    marginTop: '6rem'
  }

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <Header />
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