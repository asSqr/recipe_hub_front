import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from "next/router";
import firebase from '../firebase/firebase';
import { useAuth } from '../utils/auth';
import styles from '/styles/Home.module.css'
import { widthThreshold, useWindowDimensions} from '../utils/utils';

const Header = () => {
  const { user } = useAuth();
  const { width } = useWindowDimensions();

  useEffect(() => {
    
  }, []);

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>
          <Link href="/"><a>{width >= widthThreshold ? 'Recipe Hub (Github for Cooking)' : 'Recipe Hub'}</a></Link>
        </h1>
      </Link>
      <div className="menu">
        { user ? (
          <>
            <span className="menu-item-user">
              {user.photo_url && <img src={user.photo_url} />}
            </span>
            <span className="menu-item-user" style={{ marginLeft: '-2.2rem' }}>
              {user.user_name}
            </span>
          </>
        ) : (
          <span className="menu-item">
            <Link href="/signin">
              <a>ユーザー登録</a>
            </Link>
          </span>
        )}
        {user ? (
          <span className="menu-item">
            <Link href="/signout">
              <a>ログアウト</a>
            </Link>
          </span>
        ) : (
        <span className="menu-item">
          <Link href="/login">
            <a>ログイン</a>
          </Link>
        </span>)}
      </div>
    </div>
  );
}

export default Header;