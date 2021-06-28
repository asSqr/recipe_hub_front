import Head from 'next/head';
import Router from 'next/router';
import firebase from '../firebase/firebase';
import { useRef, useEffect } from 'react';
import { Button, TextField, Grid } from '@material-ui/core'
import { sleep } from '../utils/utils';

const UserForm = ({ isRegister }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if( user ) {
        Router.push('/'); 
      }
    })
  }, []);
  
  const login = async () => {
    firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(res => {
          Router.push('/');
        })
        .catch(error => {
          
        });
  };

  const authenticate = async () => {
    console.log('authenticate');
    console.log(emailRef.current.value, passwordRef.current.value);

    if( isRegister ) {
      firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(res => {
          const user = firebase.auth().currentUser;
          
          user.updateProfile({
            displayName: userNameRef.current.value
          });

          Router.push('/');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await login();
    }
  }

  const signinWith = (provider) => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(async res => {
        if( res.user ) {
          Router.push('/');
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  const keyHandler = e => {
    if (e.key == 'Enter') {
      e.preventDefault()
      authenticate()
    }
  }

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
      </Head>
	  
      <form className="login">
        <h2>{isRegister ? 'アカウントを登録' : 'アカウントにログイン'}</h2>
        <hr />
        <Grid container justify="center" spacing={2}>
          <TextField
            id="standard-basic"
            label="Email"
            inputRef={emailRef}
            color="primary"
            inputProps={{ maxLength: 100 }}
            focused
            style={{width: '300px', marginTop: '2rem'}}
            onChange={keyHandler}
          /> <br />
          <TextField
            id="standard-basic"
            label="ユーザー名"
            inputRef={userNameRef}
            color="primary"
            inputProps={{ maxLength: 100 }}
            focused
            style={{width: '300px', marginTop: '2rem'}}
            onChange={keyHandler}
          /> <br />
          <TextField
            id="standard-basic"
            label="パスワード"
            inputRef={passwordRef}
            color="primary"
            inputProps={{ maxLength: 100 }}
            focused
            style={{width: '300px', margin: '2rem'}}
            type="password"
            onChange={keyHandler}
          /> <br />
          <Button 
            variant="contained"
            color="primary"
            onClick={authenticate}
            style={{margin: '2rem'}}
          >
            { isRegister ? '登録' : 'ログイン' }
          </Button>
        </Grid>
        
        { !isRegister && (
          <div>
            <p className="or">各種連携で登録</p>
            <div className="login-github" onClick={() => signinWith(new firebase.auth.GithubAuthProvider())}>
              <i className="fab fa-github"></i>
              <span>Github でログイン</span>
            </div>
            <div className="login-twitter" onClick={() => signinWith(new firebase.auth.TwitterAuthProvider())}>
              <i className="fa fa-twitter"></i>
              <span>Twitter でログイン</span>
            </div>
            <div className="login-google" onClick={() => signinWith(new firebase.auth.GoogleAuthProvider())}>
              <i className="fab fa-google"></i>
              <span>Google でログイン</span>
            </div>
            <div className="login-facebook" onClick={() => signinWith(new firebase.auth.FacebookAuthProvider())}>
              <i className="fa fa-facebook"></i>
              <span>Facebook でログイン</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserForm;