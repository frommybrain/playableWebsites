import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = '/api/auth/twitter';
  };

  return <button onClick={handleLogin}>Login with Twitter</button>;
};

export default LoginButton;
