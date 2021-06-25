import { Button, TextField, TextareaAutosize, Grid } from '@material-ui/core'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { postRecipe } from '../utils/api_request';
import RichEditorExample from '../components/markdown';

export default function CreateRecipe() {
  const nameRef = React.createRef();
  const [recipe, setRecipe] = useState('');
  const titleRef = React.createRef();
  const genreRef = React.createRef();

  const clickHandler = () => {
    const name = nameRef.current.value;
    const title = titleRef.current.value;
    const genre = genreRef.current.value;

    console.log(recipe);

    postRecipe({
      name,
      recipe,
      title,
      id_author: 'id_author',
      genre
    })
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          レシピを作る
        </h1>
        <form style={{ margin: '2rem' }} noValidate autoComplete="off">
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
          <TextField
            id="standard-basic"
            label="料理名"
            inputRef={nameRef}
            color="primary"
            focused
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> <br />
          <TextField
            id="standard-basic"
            label="ジャンル"
            inputRef={genreRef}
            color="primary"
            focused
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> <br />
          <TextField
            id="standard-basic"
            label="レシピ名"
            inputRef={titleRef}
            color="primary"
            focused
            style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> 
          <br />
          </Grid>
          {/* <TextareaAutosize
            rowsMax={100}
            aria-label="maximum height"
            placeholder="レシピを入力してください"
            defaultValue=""
            ref={recipeRef}
            style={{marginTop: '2rem', marginButtom: '2rem'}}
          /> <br /> */}
          <div style={{marginTop: '2rem', marginButtom: '2rem'}}>
            <RichEditorExample 
              rowsMax={100}
              aria-label="maximum height"
              placeholder="レシピを入力してください"
              defaultValue=""
              setContent={setRecipe}
            />
          </div>
          <Button 
            variant="contained"
            color="primary"
            onClick={clickHandler}
            style={{marginTop: '2rem', marginButtom: '2rem'}}
          >
            レシピ作成
          </Button>
        </form>

        <Link href="/recipes"><Button 
            variant="contained"
            color="primary"
            style={{margin: '4rem'}}
          >
          レシピ一覧へ
        </Button></Link>
      </main>
    </div>
  )
}