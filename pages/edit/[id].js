import Editor from '../../components/EditorComponent';
import { fetchRecipe, patchRecipe } from '../../utils/api_request';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

export default function EditRecipe() {
  const [recipe, setRecipe] = useState(null);
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

  return (
    <>
      {recipe && (
        <main className={styles.main} > 
          <Editor apiFunc={patchRecipe} title="レシピを編集" action="レシピ更新" initObj={recipe} />
        </main>
      )}
    </>
  );
};
