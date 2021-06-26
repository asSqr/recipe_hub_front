import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import { fetchTree } from '/utils/api_request';
import { useEffect, useState } from 'react';
import { TreeComponent } from '../../components/TreeComponent'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'

export default function Tree() {
  const [tree, setTree] = useState({});

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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          木構造
        </h1>
        <p>{id_recipe}</p>
        <ul class="construction">
          <TreeComponent {...tree} />
        </ul>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={6} style={{textAlign: "center"}}>
            <Link href={`/recipe/${id_recipe}`}>
              <Button variant="contained" color="primary">
                レシピに戻る
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} style={{textAlign: "center"}}>
            <Link href={`/recipes`}>
              <Button variant="contained" color="primary">
                レシピ一覧
              </Button>
            </Link>
          </Grid>
        </Grid>
      </main>
    </div>
  )

}