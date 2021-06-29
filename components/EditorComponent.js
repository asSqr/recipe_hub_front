import { Button, TextField, TextareaAutosize, Grid } from '@material-ui/core'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipe, deleteRecipe } from '../utils/api_request';
import RichEditorExample from '../components/markdown';
import RecipeItem from '../components/preview';
import Router, { useRouter } from 'next/router';

export default function Editor({ apiFunc, title, action, initObj, forkFlag, id_recipe, user }) {
  const nameRef = React.createRef();
  const [recipe, setRecipe] = useState('');
  const [recipeFrom, setRecipeFrom] = useState(null);
  const titleRef = React.createRef();
  const genreRef = React.createRef();
  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [genreError, setGenreError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const f = async () => {
      if( !initObj )
        return;
      
      nameRef.current.value = initObj.name;
      titleRef.current.value = initObj.title;
      genreRef.current.value = initObj.genre;

      if( initObj && initObj.thumbnail ) {
        setImgData(initObj.thumbnail);
      }

      if( initObj && initObj.id_fork_from ) {
        const { data } = await fetchRecipe(initObj.id_fork_from);

        setRecipeFrom(data);
      }

      setGenreError(!validateGenre(initObj.genre));
    }

    f();
  }, [initObj]);

  const getImage = (e) => {
      if(!e.target.files) return
      const img = e.target.files[0]
      setImage(img)
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
  }

  const clickHandler = async () => {
    if( recipeFrom && user && recipeFrom.id_author !== user.id ) {
      Router.push('/');

      return;
    }

    const name = nameRef.current.value;
    const title = titleRef.current.value;
    const genre = genreRef.current.value;

    const data = new FormData()
    if( image )
      data.append('thumbnail', image)
    
    data.append('name', name);
    data.append('recipe', recipe);
    data.append('title', title);
    data.append('author_name', user.user_name);
    data.append('id_author', user.id);
    data.append('author_photo_url', user.photo_url);
    data.append('genre', genre);
    
    if( initObj )
      await apiFunc(id_recipe, data);
    else
      await apiFunc(data);

    router.push(`/`);
  }

  const cancelHandler = async () => {
    if( !id_recipe )
      return;

    await deleteRecipe(id_recipe);

    router.push('/');
  }

  const validateGenre = str => {
    const genreString = ["和食", "洋食", "中華"];

    return genreString.indexOf(str) != -1;
  };

  const handleChange = () => {
    const genre = genreRef.current.value;

    setGenreError(!validateGenre(genre));
  }

  // const getImageName = "image/"+{image.name}

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {title}
        </h1>
        {recipeFrom && (
          <div style={{ margin: '4rem' }}>
            <p style={{ margin: '0.5rem' }}>派生元レシピ</p>
            <RecipeItem show_link={false} {...recipeFrom} />
          </div>
        )}
        <form style={{ margin: '2rem' }} noValidate autoComplete="off">
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
          <Grid style={{marginRight: '10rem'}}>
          <TextField
            id="standard-basic"
            label="料理名"
            inputRef={nameRef}
            color="primary"
            inputProps={{ maxLength: 100 }}
            focused
            style={{width: '300px', marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> <br />
          <TextField
            id="standard-basic"
            label="ジャンル (和食・洋食・中華)"
            inputRef={genreRef}
            color="primary"
            focused
            style={{width: '300px', marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
            error={genreError}
            onChange={handleChange}
          /> <br />
          <TextField
            id="standard-basic"
            label="レシピ名"
            inputRef={titleRef}
            color="primary"
            focused
            inputProps={{ maxLength: 100 }}
            style={{width: '300px', marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
          /> 
          <br />
          </Grid>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5rem', marginTop: '2rem'}}>
            <img src={imgData} style={{width: '300px', height: '200px', marginTop: '2rem', border: 'double 5px #3f51b5'}} />
            <label htmlFor="file" style={{marginRight: '2rem', marginTop: '2rem',  marginBottom: '1rem', color: '#3f51b5'}}>サムネイル画像を追加して下さい</label>
            <input id="img" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={(e) => getImage(e)} />  
          </div>
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
              default={initObj ? initObj.recipe : ""}
              setContent={setRecipe}
            />
          </div>
        </form>

        <Grid>
          <Button 
            variant="contained"
            color="primary"
            onClick={clickHandler}
            style={{margin: '2rem'}}
          >
            {action}
          </Button>
          {!forkFlag && (<Link href="/"><Button 
              variant="contained"
              color="primary"
              style={{margin: '2rem'}}
            >
            レシピ一覧へ
          </Button></Link>)}
          {forkFlag && (
            <Button 
              variant="contained"
              color="primary"
              onClick={cancelHandler}
              style={{margin: '2rem'}}
            >
              キャンセル
            </Button>
          )}
        </Grid>
      </main>
    </div>
  )
}