import { Button, TextareaAutosize, Grid, Box } from '@material-ui/core'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipe, deleteRecipe, fetchImages, postImage, deleteImage } from '../utils/api_request';
import RichEditorExample from '../components/markdown';
import RecipeItem from '../components/preview';
import Router, { useRouter } from 'next/router';
import CustomTextField from '../styles/CustomTextField';
import CustomButton from '../styles/CustomButton';
import { red } from '@material-ui/core/colors';
import { widthThreshold, useWindowDimensions } from '../utils/utils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export default function Editor({ apiFunc, title, action, initObj, forkFlag, id_recipe, user }) {
  const nameRef = React.createRef();
  const [recipe, setRecipe] = useState('');
  const [recipeFrom, setRecipeFrom] = useState(null);
  const titleRef = React.createRef();
  const genreRef = React.createRef();
  const [image, setImage] = useState(null);
  const [libImage, setLibImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [imgLibData, setImgLibData] = useState(null);
  const [genreError, setGenreError] = useState(false);
  const [galleryList, setGalleryList] = useState([]);
  const [galleryUploadFlag, setGalleryUploadFlag] = useState(false);
  const galleryRef = React.createRef();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [imageInputRef, setImageInputRef] = useState(null);
  
  const { width } = useWindowDimensions();
  
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

  useEffect(() => {
    const f = async () => {
      if( !user.id ) 
        return;
      
      const { data: imageList } = await fetchImages(user.id);

      setImages(imageList);

      const convertedList = imageList.map(obj => { 
        return {
          original: obj.image,
          thumbnail: obj.image
        };
      });

      console.log(convertedList);

      setGalleryList(convertedList);

      setGalleryUploadFlag(false);
    };

    f();
  }, [user.id, galleryUploadFlag]);

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

  const getLibImage = (e) => {
    if(!e.target.files) return
    const img = e.target.files[0]
    setLibImage(img)
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgLibData(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
    setImageInputRef(e);
  }

  const clickHandler = async () => {
    if( genreError )
      return;
    
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

    if( forkFlag ) {
      data.append('is_temp', false);
    }
    
    if( initObj )
      await apiFunc(id_recipe, data);
    else
      await apiFunc(data);

    router.push(`/`);
  }

  const libUploadHandler = async () => {
    if( !libImage )
      return;
    
    const data = new FormData()
    if( libImage )
      data.append('image', libImage)
    
    data.append('id_author', user.id);

    await postImage(data);

    setGalleryUploadFlag(true);
    setLibImage(null);
    setImgLibData(null);
    imageInputRef.target.value = null;
  }

  const libDeleteHandler = async () => {
    const index = galleryRef.current.state.currentIndex;

    await deleteImage(images[index].id);

    setGalleryUploadFlag(true);
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

  const galleryHandler = () => {
    setGalleryIndex(galleryRef.current.state.currentIndex);

    // console.log(galleryRef.current.state.currentIndex);
  }

  // const getImageName = "image/"+{image.name}

  return (
    <div>
      <h1 className={styles.title}>
        {title}
      </h1>
      {recipeFrom && (
        <div style={{ margin: '4rem' }}>
          <RecipeItem show_link={false} {...recipeFrom} is_fork={true} />
        </div>
      )}
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid style={{ marginLeft: '5rem', marginRight: '5rem' }}>
            <CustomTextField
              id="standard-basic"
              label="料理名"
              inputRef={nameRef}
              color="primary"
              inputProps={{ maxLength: 100 }}
              focused
              style={{width: '300px', marginTop: '2rem', marginButtom: '2rem' }}
            /> <br />
            <CustomTextField
              id="standard-basic"
              label="ジャンル (和食・洋食・中華)"
              inputRef={genreRef}
              color="primary"
              focused
              style={{width: '300px', marginTop: '2rem', marginButtom: '2rem' }}
              error={genreError}
              onChange={handleChange}
            /> <br />
            <CustomTextField
              id="standard-basic"
              label="レシピ名"
              inputRef={titleRef}
              color="primary"
              focused
              inputProps={{ maxLength: 100 }}
              style={{width: '300px', marginTop: '2rem', marginButtom: '2rem' }}
            /> 
            <br />
          </Grid>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5rem', marginRight: '5rem', marginTop: '2rem'}}>
            <img src={imgData} style={{width: '300px', height: '200px', marginTop: '2rem', border: 'double 5px #FFC000'}} />
            <label htmlFor="file" style={{marginRight: '2rem', marginTop: '2rem',  marginBottom: '1rem', color: '#9c786c'}}>サムネイル画像を追加して下さい</label>
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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{marginTop: '4rem'}}>
          {galleryList && galleryList.length > 0 && (<ImageGallery items={galleryList} showPlayButton={false} ref={galleryRef} onSlide={galleryHandler} />)}
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5rem', marginRight: '5rem', marginTop: '2rem'}}>
            {imgLibData ? (
              <img src={imgLibData} style={{width: '300px', height: '200px', marginTop: '2rem', border: 'double 5px #FFC000'}} />
            ) : (
              <div style={{width: '300px', height: '200px', marginTop: '2rem', border: 'double 5px #FFC000'}} />
            )}
            <label htmlFor="file" style={{marginRight: '2rem', marginTop: '2rem',  marginBottom: '1rem', color: '#9c786c'}}>ギャラリーに投稿する画像を選択して下さい</label>
            <input id="img" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={(e) => getLibImage(e)} />  
            <Button 
              variant="contained"
              color="secondary"
              onClick={libUploadHandler}
              style={{marginTop: '2rem', marginLeft: '3rem', marginRight: '3rem', width: '200px'}}
              endIcon={<CheckIcon />}
            >
              アップロード
            </Button>
            {galleryList && galleryList.length > 0 && (<CustomButton 
              variant="contained"
              themeColor={red}
              onClick={libDeleteHandler}
              endIcon={<CloseIcon />}
              style={{marginTop: '2rem', marginLeft: '3rem', width: '200px'}}
            >
              選択された画像を削除
            </CustomButton>)}
          </div>
        </Grid>
        <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
          <RichEditorExample 
            rowsMax={10}
            aria-label="maximum height"
            placeholder="レシピを入力してください"
            defaultValue=""
            default={initObj ? initObj.recipe : ""}
            setContent={setRecipe}
            galleryList={galleryList}
            index={galleryIndex}
          />
        </div>
      </form>
      
      <Grid container alignItems="center" justify="center">
        {!forkFlag && (<Link href="/"><CustomButton 
            variant="contained"
            themeColor={red}
            style={{margin: '2rem'}}
            endIcon={<CloseIcon />}
          >
          キャンセル
        </CustomButton></Link>)}
        {forkFlag && (
          <CustomButton 
            variant="contained"
            themeColor={red}
            onClick={cancelHandler}
            style={{margin: '2rem'}}
            endIcon={<CloseIcon />}
          >
            キャンセル
          </CustomButton>
        )}
        <Button 
          variant="contained"
          color="secondary"
          onClick={clickHandler}
          style={{margin: '2rem'}}
          endIcon={<CheckIcon />}
        >
          {action}
        </Button>
      </Grid>
    </div>
  )
}