// test using instanced rigid bodies and multiple planes
// found it to be super laggy
import React, { useRef, useEffect } from 'react';
import { RigidBody, InstancedRigidBodies } from '@react-three/rapier';
import { useThree, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import useFBM from '@/hooks/useFBM';
import useTerrainStore from '@/app/zustand/terrainStore';
import * as THREE from 'three';

import TestCharacter from '../character/testCharacter';
import { KeyboardControls, Hud, OrbitControls } from '@react-three/drei'
import Ecctrl, { EcctrlAnimation } from "ecctrl";



const TerrainTile = ({ index, position }) => {
    const ref = useRef();

    return (
        <instancedMesh ref={ref} args={[null, null, 1]}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <meshStandardMaterial color="white" side={THREE.DoubleSide} wireframe/>
        </instancedMesh>
    );
};



const Terrain = () => {
    const instancedApi = useRef(null);
    const groupRef = useRef();
    const gridSize = 5;
    const tileSize = 10;

    // Create some positions for each tile
    const positions = Array.from({ length: gridSize * gridSize }, (_, index) => {
        const x = (index % gridSize) * tileSize - (gridSize * tileSize) / 2;
        const y = Math.floor(index / gridSize) * tileSize - (gridSize * tileSize) / 2;
        return [x, y, 0];
    });

    useEffect(() => {
        // Rotate everything to make it a floor, not a wall
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.PI / 2;
            groupRef.current.position.y = -1;
        }
    }, []);

    return (
        <>
        <InstancedRigidBodies
            ref={instancedApi}
            positions={positions}
            colliders="trimesh"
        >
            <group ref={groupRef}>
                {positions.map((position, index) => (
                    <TerrainTile key={index} index={index} position={position} />
                ))}
            </group>
        </InstancedRigidBodies>
            {/*}
<KeyboardControls map={keyboardMap}>
<Ecctrl>
  <TestCharacter />
</Ecctrl>
            </KeyboardControls>*/}
        </>
    );
};

export default Terrain;