import {Icon, TextField, Button, FormGroup, Switch, Container, Grid} from '@material-ui/core'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../utils/api_request';
import RecipeMenu from '../components/RecipeMenu';
import { normalizeRouteRegex } from 'next/dist/lib/load-custom-routes';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function Recipes() {

  // use State の使い方
  // https://ja.reactjs.org/docs/hooks-state.html

  // レシピ一覧のstate
  const [recipes, setRecipes] = useState([]);

  // 和洋中の検索ステータス
  const [wa, setWa] = useState(true);
  // console.log(wa);
  const [you, setYou] = useState(true);
  // console.log(you);
  const [chu, setChu] = useState(true);
  // console.log(chu);

  // 料理名，ユーザー名入力
  const [dish, setDish] = useState([]);
  // console.log(dish)
  // フォームに入力された値をdishに登録するまでに入れておくためのstate
  const [tmpDish, setTmpDish] = useState("");

  const addDish = () => {
    setDish(tmpDish);
  };

  // レシピの取得
  useEffect(() => {
    const f = async () => {
      const { data } = await fetchRecipes();

      setRecipes(data);
    };

    f();
  }, []);

  return (
      <main className={styles.main}>  {/* 全体の調整を行うタイミングでHome.module.cssのmainのmargin topを編集して幅の調整を行いたい   */}

        <h1 className={styles.title}>
          レシピ一覧
        </h1>

        {/* <div className={styles.container}>   */}
        {/* 全体の調整を行うタイミングでHome.module.cssのcontainerを編集して幅の調整を行いたい */}
        
        <div style={{ margin: '2rem' ,marginLeft: '10rem'}}>
      
          <TextField label="料理名,ユーザー名" type="text"
            name="料理名ユーザー名検索"
            onChange={e => setTmpDish(e.target.value)}
            value={tmpDish} />

          <Button variant="contained" color="primary" href="#contained-buttons"　onClick={addDish}>
            検索
          </Button>

          {/* <Button
            variant="contained"
            color="primary"
            // endIcon={<Icon Send />}
          >
            新規作成
          </Button> */}

          <FormGroup row>
            <FormControlLabel
              control={<Switch color="primary" checked={wa} onClick={() => setWa(! wa)}  />}
              label="和食"
            />
            <FormControlLabel
                control={<Switch color="primary" checked={you} onClick={() => setYou(! you)}  />}
                label="洋食"
            />
            <FormControlLabel
                control={<Switch color= "primary" checked={chu} onClick={() => setChu(! chu)}  />}
                label="中華"
            />
          </FormGroup>
      
        </div>


        <div style={{ marginLeft: '5rem'}}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
            {recipes && recipes.map((recipe, idx) => {
              const { create_date, genre, id, id_author, id_fork_from, id_fork_to_list, name, recipe_detail, show_link, thumbnail, title, update_date } = recipe;
            
              if (wa == false && genre == "和食" ||
              you == false && genre == "洋食"||
              chu == false && genre == "中華"){
                return
              }
              else if (name.match(dish) || id_author.match(dish)|| dish == ""){
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
        </div>
        

      </main>
  )
}
