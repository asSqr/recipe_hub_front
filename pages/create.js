import { Button, TextField, TextareaAutosize } from '@material-ui/core'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { postRecipe } from '../utils/api_request';

export default function CreateRecipe() {
  const nameRef = React.createRef();
  const recipeRef = React.createRef();

  const clickHandler = () => {
    const name = nameRef.current.value;
    const recipe = recipeRef.current.value;
    console.log(name, recipe);

    postRecipe({
      name,
      recipe,
      id_author: 'id_author'
    })
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          レシピを作る
        </h1>
        <form style={{ margin: '2rem' }} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="レシピ名"
            inputRef={nameRef}
          /> <br />
          <TextareaAutosize
            rowsMax={100}
            aria-label="maximum height"
            placeholder="レシピを入力してください"
            defaultValue=""
            ref={recipeRef}
            style={{marginTop: '2rem', marginButtom: '2rem'}}
          /> <br />
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
