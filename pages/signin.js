import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import Auth from '../components/Auth';
import UserForm from '../components/UserForm';
import Header from '../components/Header';

export default function SigninPage() {
  return (
    <div>
      <Auth />
      <Header />
      <UserForm isRegister={true} />
    </div>
  )
}
