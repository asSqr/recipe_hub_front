import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a>Recipe Hub!</a>
      </h1>

      <p className={styles.description}>
        Github for Cooking Development <br/> <br/>
        Recipes available <Link href="/recipes"><a>here</a></Link>
      </p>
    </main>
  )
}
