// utils/VerifyUser.js
import { useEffect } from 'react';
import useUserStore from '@/app/zustand/userStore';
import verifyToken from './verifyToken';

const VerifyUser = () => {
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const verify = async () => {
      const user = await verifyToken(); 
      console.log('User data from verifyToken:', user);
      if (user) {
        setUser(user);
      }
    };
    verify();
  }, [setUser]);

  return null; 
};

export default VerifyUser;
