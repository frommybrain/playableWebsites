import { KeyboardControls, Hud, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useState, useEffect } from 'react';
import Terrain from './maps/testTerrain1';
import TestCharacter from './character/testCharacter';
import Lighting from './lighting';
import useTerrainStore from '../zustand/terrainStore';

const MainScene = () => {
    const { editorMode } = useTerrainStore();
    const [enableCharacter, setEnableCharacter] = useState(!editorMode);

    useEffect(() => {
        setEnableCharacter(!editorMode);
    }, [editorMode]);

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
            <OrbitControls makedefault />
            <Physics timeStep="vary">
                <Suspense fallback={null}>

                    <KeyboardControls enabled={enableCharacter} map={keyboardMap}>
                        {/*}
                            {enableCharacter && (
                            */}
                        {/*<Ecctrl>
                                    <TestCharacter />
                        </Ecctrl>*/}
                        {/*}
                            )}
                        */}
                    </KeyboardControls>

                    {/* Sphere for some simple rapier testing */}
                    <RigidBody type="dynamic" position={[0, 30, 0]} restitution={0.9}>
                        <mesh castShadow>
                            <sphereGeometry args={[0.8, 32, 32]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                    </RigidBody>

                    <Terrain />

                </Suspense>
            </Physics>
        </>
    );
};

export default MainScene;