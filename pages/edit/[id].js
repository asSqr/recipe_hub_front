import Editor from '../../components/EditorComponent';
import { fetchRecipe, patchRecipe, deleteRecipe } from '../../utils/api_request';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import Auth from '../../components/Auth';
import Header from '../../components/Header';

export default function EditRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [forkFlag, setForkFlag] = useState(false);
  const router = useRouter();

  let { id: id_recipe } = router.query;

  const [idRepo, setIdRepo] = useState(id_recipe);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const f = async () => {
      if( !id_recipe )
        return;

      if( id_recipe.endsWith('z') ) {
        setForkFlag(true);

        setIdRepo(id_recipe.slice(0, id_recipe.length-1));
      }

      console.log(id_recipe.endsWith('z') ? id_recipe.slice(0, id_recipe.length-1) : id_recipe);

      const { data } = await fetchRecipe(id_recipe.endsWith('z') ? id_recipe.slice(0, id_recipe.length-1) : id_recipe);

      setRecipe(data);

      setUser(JSON.parse(localStorage.getItem('user')));

      console.log(JSON.parse(localStorage.getItem('user')));
      console.log(user);
    };

    f();
  }, [id_recipe]);

  return (
    <>
      <Auth />
      <Header />
      {recipe && user && (
        <main className={styles.main} > 
          <Editor apiFunc={patchRecipe} title="レシピを編集" action={forkFlag ? "レシピ作成" : "レシピ更新"} initObj={recipe} forkFlag={forkFlag} id_recipe={idRepo} user={user} />
        </main>
      )}
    </>
  );
};
