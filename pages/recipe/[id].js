import { Button, TextField, TextareaAutosize } from '@material-ui/core'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipe, postFork } from '../../utils/api_request';
import RecipeItem from '../../components/RecipeItem';

export default function Recipe() {
  const nameRef = React.createRef();
  const [recipe, setRecipe] = useState({});
  const router = useRouter();

  const { id: id_recipe } = router.query;

  useEffect(() => {
    const f = async () => {
      const { data } = await fetchRecipe(id_recipe);

      setRecipe(data);
    };

    f();
  }, []);

  const clickHandler = () => {
    const name = nameRef.current.value;
    
    postFork({
      id_user: 'id_user',
      id_repo: id_recipe,
      name
    })
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          レシピ
        </h1>

        <div style={{ margin: '4rem' }}>
          <RecipeItem show_link={false} {...recipe} />
        </div>

        <form style={{ margin: '2rem' }} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="レシピ名"
            inputRef={nameRef}
            style={{marginTop: '2rem', marginButtom: '2rem'}}
          /> <br />
          <Button 
            variant="contained"
            color="primary"
            onClick={clickHandler}
            style={{marginTop: '2rem', marginButtom: '2rem'}}
          >
            レシピ Fork
          </Button>
        </form>
        <Link href="/recipes"><Button 
            variant="contained"
            color="primary"
            onClick={clickHandler}
            style={{margin: '4rem'}}
          >
          レシピ一覧へ
        </Button></Link>
      </main>
    </div>
  )
}
