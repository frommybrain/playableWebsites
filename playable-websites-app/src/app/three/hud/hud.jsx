import { useEffect, useState } from 'react';
import { Html } from "@react-three/drei";
import styles from './hud.module.scss'
import useUserStore from "@/app/zustand/userStore"; 
import LoginButton from "@/components/auth/LoginButton";
import updateUserScore from "../../../../utils/updateUserScore";

const MainSceneHud = () => {
    const { user, isLoggedIn, setUser } = useUserStore(state => state); 
    const [spotifyButtonText, setSpotifyButtonText] = useState('Connect Spotify');

    useEffect(() => {
      const checkSpotifyConnection = async () => {
          if (user) {
              const response = await fetch('/api/auth/spotify/checkSpotifyConnection');
              if (response.ok) {
                  const { isConnected } = await response.json();
                  setSpotifyButtonText(isConnected ? 'Recheck Spotify' : 'Connect Spotify');
              }
          }
      };

      checkSpotifyConnection();
  }, [user]);

    const handleAddScore = async () => {
      if (user) {
          const newScore = await updateUserScore(user.id, 100);
          if (newScore !== null) {
              setUser({ ...user, score: newScore });
          }
      }
  };

  const handleSpotifyConnect = () => {
    window.location.href = '/api/auth/spotify';
  };

  

    return (
        <>
            <Html fullscreen wrapperClass={styles.hudWrapper}>
                <div className={styles.hudContainer}>
                    <LoginButton />
                    {isLoggedIn && user && (
                        <>
                            <p className={styles.loggedInContainer}>Welcome, {user.first_name}</p>
                            <p className={styles.scoreContainer}>Score: {user.score}</p>
                            <button className={styles.testButton} onClick={handleAddScore}>Add 100 Points</button>
                            <button className={styles.testButton} onClick={handleSpotifyConnect}>{spotifyButtonText}</button>
                        </>
                    )}
                </div>
            </Html>
        </>
    );
}
    
export default MainSceneHud;
