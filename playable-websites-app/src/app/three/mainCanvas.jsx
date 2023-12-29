import { Canvas } from '@react-three/fiber'
import styles from './three.module.scss'
import MainScene from './mainScene'
import MainSceneHud from './hud/hud'
import { Hud } from '@react-three/drei'

const MainCanvas = () => {
    return (
        <div className={styles.canvasContainer}>
            <Canvas
                className={styles.canvas}
                dpr={1}
                shadows
                camera={{
                    near: 1,
                    far: 1000,
                    fov: 35,
                }}
            >
                <Hud>
                    <MainScene />
                </Hud>
                <Hud renderPriority={2}>
                    <MainSceneHud />
                </Hud>
            </Canvas>
        </div>
    )
}

export default MainCanvas;