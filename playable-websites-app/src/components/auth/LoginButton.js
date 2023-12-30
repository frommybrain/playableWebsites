import React from 'react';
import styles from './auth.module.scss'
const LoginButton = () => {
  

  return (
    <button className={styles.loginButton} onClick={() => (window.location.href = '/api/auth/google')}>
      Login with Google
    </button>
  );
};


export default LoginButton;
