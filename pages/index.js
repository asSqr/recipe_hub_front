import {Icon, FormGroup, TextField, Button, Checkbox, Switch, Container, Grid, ButtonGroup} from '@material-ui/core'
import Link from 'next/link';
import Head from 'next/head';
import { appOrigin } from '../utils/constants';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../utils/api_request';
import RecipeMenu from '../components/RecipeMenu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import { withStyles } from "@material-ui/core/styles";
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import Header from '../components/Header';
import Meta from '../components/Meta';
import tomatoImg from '../public/tomato.jpg';
import { sleep } from '../utils/utils';
import firebase from '../firebase/firebase';
import Footer from '../components/Footer';

const CheckboxCustom = withStyles({
  root: {
    "&$checked": {
      "& .MuiIconButton-label": {
        position: "relative",
        zIndex: 0
      },
      "& .MuiIconButton-label:after": {
        content: '""',
        left: 4,
        top: 4,
        height: 15,
        width: 15,
        position: "absolute",
        backgroundColor: "#260e04",
        zIndex: -1
      }
    }
  },
  checked: {}
})(Checkbox);

export default function Recipes({ recipes }) {
  // 和洋中の検索ステータス
  const [state, setState] = React.useState({
    wa: true,
    you: true,
    chu: true,
    damy1: true,
    damy2: true,
  });

  const handleChange = (event) => {
    setState({ ...state, 
      [event.target.name]: event.target.checked,
    });
  };

  // 料理名，ユーザー名入力
  const [dish, setDish] = useState([]);

  // フォームに入力された値をdishに登録するまでに入れておくためのstate
  const [tmpDish, setTmpDish] = useState("");

  const addDish = () => {
    setDish(tmpDish);
  };

  // https://www.ac-illust.com/main/detail.php?id=2616215&word=カトラリーフレーム※png背景透明&searchId=3954786678
  const styling = {
    backgroundImage: `url(${tomatoImg})`,
    width:"100%",
    marginTop: '2rem'
  }

  // レシピの取得
  useEffect(() => {
    const f = async () => {

    };

    f();
  }, []);

  return (
    <>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />

      <Header />
      
      <main className={styles.main} > 

        {/* タイトル */}
        <h1 className={styles.title}>
          <LocalDiningIcon /> レシピ一覧 <LocalDiningIcon />
        </h1>

        {/* 新規作成 */}
        <ButtonGroup container justify ='center' style={{margin: '2rem'}}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<AddIcon />}
            href = '/create'
          >新規作成
          </Button>
        </ButtonGroup>

        <Grid container justify="center" spacing={2}>
          {/* 選択エリア */}
          <FormGroup row style={{marginTop: '5px', marginRight: '5px'}}>
            <FormControlLabel
              control={<CheckboxCustom checked={state.wa} onChange={handleChange} name = "wa" color="primary" />}
              label="和食"
            />
            <FormControlLabel
              control={<CheckboxCustom checked={state.you} onChange={handleChange} name = "you" color="primary" />}
              label="洋食"
            />
            <FormControlLabel
              control={<CheckboxCustom checked={state.chu} onChange={handleChange} name = "chu" color="primary" />}
              label="中華"
            />
            {/* <FormControlLabel
              control={<Checkbox checked={state.damy1} onChange={handleChange} name = "damy1" color="primary" />}
              label="ダミー1"
            />
            <FormControlLabel
              control={<Checkbox checked={state.damy2} onChange={handleChange} name = "damy2" color="primary" />}
              label="ダミー2"
            /> */}
          </FormGroup>

          {/* 検索メニュー */}
          <Grid>
            <TextField label="レシピ名, 料理名, ユーザー名" type="text"
              name="料理名ユーザー名検索"
              onChange={e => setTmpDish(e.target.value)}
              color="primary" 
              focused
              value={tmpDish} />
            <Button variant="contained" color="primary"　onClick={addDish}　endIcon={<SearchIcon />}>
              検索
            </Button>
          </Grid>
        </Grid>
       
        {/* メニュー表示 */}
        <Container style={styling}>
          <Grid container justify="center" spacing={4}>
            {recipes && recipes.map((recipe, idx) => {
              const { create_date, genre, id, author_name, id_fork_from, id_fork_to_list, name, recipe_detail, show_link, thumbnail, title, update_date } = recipe;
            
              if (state.wa == false && genre == "和食" ||
              state.you == false && genre == "洋食"||
              state.chu == false && genre == "中華"){
                return
              }
              else if (title.match(dish) || name.match(dish) || author_name.match(dish)|| dish == ""){
                return (
                  <div key={idx} style={{ margin: '2rem' }}>
                    <RecipeMenu show_link={true} {...recipe} />
                  </div>
                );
              }else{
                return
              }

            })}
          </Grid>
        </Container>    
      </main>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  let { data } = await fetchRecipes();

  const compFunc = (obj1, obj2) => {
    const d1 = new Date(obj1.create_date);
    const d2 = new Date(obj2.create_date);
    return d2-d1;
  };

  data = data.sort(compFunc);

  return { props: { recipes: data } }
}