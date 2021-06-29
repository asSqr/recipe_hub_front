import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import Auth from '../components/Auth';
import UserForm from '../components/UserForm';
import Header from '../components/Header';
import Head from 'next/head';
import { appOrigin } from '../utils/constants';
import Meta from '../components/Meta';

export default function SigninPage() {
  return (
    <div>
      <Meta image_url={`${appOrigin}/tomato.jpg`} />
      <Header />
      <UserForm isRegister={true} />
    </div>
  )
}
