import { Html } from "@react-three/drei";
import styles from './hud.module.scss'
import useScoreStore from "@/app/zustand/scoreStore";
import useUserStore from "@/app/zustand/userStore"; 
import LoginButton from "@/components/auth/LoginButton";

const MainSceneHud = () => {
    const score = useScoreStore(state => state.score)
    const { user, isLoggedIn } = useUserStore(state => state); 

    return (
        <>
          <Html fullscreen wrapperClass={styles.hudWrapper}>
            <div className={styles.hudContainer}>
              <LoginButton />
              {isLoggedIn && user && <p className={styles.loggedInContainer}>Welcome, {user.first_name}</p>}
              <p className={styles.scoreContainer}>Score: {score}</p>
            </div>
          </Html>
        </>
      );
    }
    
    export default MainSceneHud;