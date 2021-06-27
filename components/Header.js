import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from "next/router";
import firebase from '../firebase/firebase';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if( user ) {
        console.log(user);

        setUser({ user_name: user.displayName, photo_url: user.photoURL, id: user.uid });
      } else {
        Router.push('/login'); 
      }
    })
  }, []);

  return (
    <div className="header">
      <Link href="/">
        <h1>
          <Link href="/"><a>Recipe Hub (Github for Cooking)</a></Link>
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