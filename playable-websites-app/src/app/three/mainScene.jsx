import { KeyboardControls, Hud } from '@react-three/drei'
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react';
import TestMap from './maps/testMap';
import TestCharacter from './character/testCharacter';
import Lighting from './lighting';
import SkySphere from './sky';

const MainScene = () => {

    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] }
    ];

    return (
        <>
            <Lighting />
            <SkySphere />

            <Physics timeStep="vary">
                <Suspense fallback={null}>
                    <KeyboardControls map={keyboardMap}>
                        <Ecctrl 
                            debug
                        >
                            <TestCharacter />
                        </Ecctrl>
                    </KeyboardControls>
                    <TestMap />
                </Suspense>
            </Physics>


        </>
    )
}

export default MainScene;