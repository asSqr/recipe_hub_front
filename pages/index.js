import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className="main">
      <h1 className="title">
        Welcome to <a>Recipe Hub!</a>
      </h1>

      <p className="description">
        Github for Cooking <br/> <br/>
        Recipes available <Link href="/recipes"><a>here</a></Link>
      </p>
    </main>
  )
}
