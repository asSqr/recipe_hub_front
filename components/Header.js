import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));

    console.log(JSON.parse(localStorage.getItem('user')));
    console.log(user);
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