import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from "next/router";
import firebase from '../firebase/firebase';
import { useAuth } from '../utils/auth';

const Header = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, []);

  return (
    <div className="header" style={{backgroundColor: "#00c853"}}>
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