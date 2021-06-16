import { Button, ButtonGroup } from '@material-ui/core'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../utils/api_request';
import RecipeItem from '../components/RecipeItem';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const f = async () => {
      const { data } = await fetchRecipes();

      setRecipes(data);
    };

    f();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          レシピ一覧
        </h1>
        <div style={{ margin: '4rem' }} className="grid">
          {recipes && recipes.map((recipe, idx) => {
            return (
              <div style={{ margin: '2rem' }}>
                <RecipeItem key={idx} show_link={true} {...recipe} />
              </div>
            );
          })}
        </div>
        <div style={{ margin: '2rem' }}>
          <ButtonGroup>
            <Link href="/create"><Button variant="contained" color="primary">レシピ作成</Button></Link>
          </ButtonGroup>
        </div>
      </main>
    </div>
  )
}
