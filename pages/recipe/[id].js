import { Button, TextField, TextareaAutosize, Grid } from '@material-ui/core'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipe, postFork } from '../../utils/api_request';
// import RecipeItem from '../../components/RecipeItem';
import RecipeItem from '../../components/preview';

export default function Recipe() {
  const nameRef = React.createRef();
  const titleRef = React.createRef();
  const recipeRef = React.createRef();
  const [recipe, setRecipe] = useState({});
  const router = useRouter();

  const { id: id_recipe } = router.query;

  useEffect(() => {
    const f = async () => {
      if( !id_recipe )
        return;

      const { data } = await fetchRecipe(id_recipe);

      setRecipe(data);
    };

    f();
  }, [id_recipe]);

  const clickHandler = () => {
    const name = nameRef.current.value;
    const title = titleRef.current.value;
    const recipe = recipeRef.current.value;

    postFork({
      id_user: 'id_user',
      id_repo: id_recipe,
      name,
      title,
      recipe,
      genre: name,
      thumbnail: null
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

        <form style={{ margin: '2rem', flexDirection: 'row', justifyContent: 'center', }} noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
          <TextField
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
          /> <br />
          <Button 
            variant="contained"
            color="primary"
            onClick={clickHandler}
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          >
            レシピ Fork
          </Button>
          </Grid>
        </form>
        <Link href="/recipes"><Button 
            variant="contained"
            color="primary"
            style={{margin: '4rem'}}
          >
          レシピ一覧へ
        </Button></Link>
        <Link href={`/edit/${id_recipe}`}><Button 
            variant="contained"
            color="primary"
            style={{margin: '4rem'}}
          >
          レシピ編集画面へ
        </Button></Link>
      </main>
    </div>
  )
}
