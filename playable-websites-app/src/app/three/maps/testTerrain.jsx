// test using noise for terrain
// works, but character doesn't see the heights
import React, { useRef, useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { useControls } from 'leva';
import useFBM from '@/hooks/useFBM';
import useTerrainStore from '@/app/zustand/terrainStore';
import * as THREE from 'three';
import TerrainShaderMaterial from '../shaders/shaderTerrain'

// Extend drei with the new material
extend({ TerrainShaderMaterial });

const Terrain = ({ onReady }) => {
    const [isReady, setIsReady] = useState(false);
    const meshRef = useRef();
    const { generation } = useTerrainStore();

    const noise = useFBM(generation.Scale);

    const updateTerrain = () => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const positions = mesh.geometry.attributes.position.array;
        const colors = [];
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            let noiseValue = noise(x * generation.Scale, y * generation.Scale);

            if (isNaN(noiseValue)) {
                noiseValue = 0;
            }

            if (noiseValue > generation.Threshold) {
                noiseValue = Math.pow(noiseValue - generation.Threshold, generation.Dropoff);
            } else {
                noiseValue = 0;
            }

            positions[i + 2] = noiseValue * generation.Height;


            const color = new THREE.Color();
            if (positions[i + 2] < 0.1) {
                color.set('green'); 
            } else if (positions[i + 2] < 2) {
                color.set('brown'); 
            } else {
                color.set('white'); 
            }

            colors.push(color.r, color.g, color.b);
        }

        console.log("Position samples:", positions.slice(0, 15));

        mesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
    };

    useEffect(() => {
        updateTerrain();
    }, [generation, noise]);


    return (
        <>
            <RigidBody type="fixed" colliders="trimesh">
                <group position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh ref={meshRef} castShadow receiveShadow>
                        <planeGeometry args={[200, 200, 100, 100]} />
                        <meshStandardMaterial color="white" side={THREE.DoubleSide} roughness={0.4} />
                        {/*<terrainShaderMaterial key={TerrainShaderMaterial.key} />*/}
                    </mesh>
                </group>
            </RigidBody>
        </>
    );
};

export default Terrain;