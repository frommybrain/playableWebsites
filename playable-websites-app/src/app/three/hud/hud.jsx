import { Html } from "@react-three/drei";
import styles from './hud.module.scss'
import useScoreStore from "@/app/zustand/scoreStore";

const MainSceneHud = () => {
    const score = useScoreStore(state => state.score)

    return (
        <>
            <Html fullscreen wrapperClass={styles.hudWrapper}>
                <div className={styles.hudContainer}>
                    <p className={styles.scoreContainer}>Score: {score}</p>
                </div>
            </Html>

        </>
    )
}

export default MainSceneHud;