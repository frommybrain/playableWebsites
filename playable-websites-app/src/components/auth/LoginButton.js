import React from 'react';
import useUserStore from '@/app/zustand/userStore';
import styles from './auth.module.scss'

const LoginButton = () => {
  const { isLoggedIn, logout } = useUserStore(state => ({ 
    isLoggedIn: state.isLoggedIn, 
    logout: state.logout 
  }));

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      logout(); 
    } else {
      window.location.href = '/api/auth/google'; 
    }
  };

  return (
    <button className={styles.loginButton} onClick={handleLoginLogout}>
      {isLoggedIn ? 'Logout' : 'Login with Google'}
    </button>
  );
};

export default LoginButton;
