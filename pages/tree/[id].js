import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import { fetchTree } from '/utils/api_request';
import { useEffect, useState } from 'react';

export default function Tree() {
  const [tree, setTree] = useState({});
  const router = useRouter();

  const { id: id_recipe } = router.query;

  useEffect(() => {
    const f = async () => {
      const { data } = await fetchTree(id_recipe);

      setTree(data);
    };

    f();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          木構造
        </h1>
        <p>{id_recipe}</p>
        <p>{tree['name']}</p>
      </main>
    </div>
  )

}