// test using HeightFieldCollider
// Works for a rigibody such as a ball - but doesn't work with the ecctrl package - the caharacter moves through it
import React, { useRef, useEffect, useState } from 'react';
import { RigidBody, HeightfieldCollider, MeshCollider, AnyCollider } from '@react-three/rapier';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { useControls } from 'leva';
import useFBM from '@/hooks/useFBM';
import useTerrainStore from '@/app/zustand/terrainStore';
import * as THREE from 'three';
import TerrainShaderMaterial from '../shaders/shaderTerrain'

extend({ TerrainShaderMaterial });

const Terrain = () => {
    const meshRef = useRef();
    const { generation } = useTerrainStore();
    const noise = useFBM(generation.Scale);
    const terrainWidth = 80;
    const terrainHeight = 80;
    const segments = 256;
    const heights = new Array((segments + 1) * (segments + 1)).fill(0);

    useEffect(() => {
        const geometry = new THREE.PlaneGeometry(terrainWidth, terrainHeight, segments, segments);
        const positions = geometry.attributes.position.array;

        for (let i = 0, j = 0; i < positions.length; i += 3, j++) {
            const x = positions[i];
            const y = positions[i + 1];
            let noiseValue = noise(x * generation.Scale, y * generation.Scale);

            noiseValue = isNaN(noiseValue) ? 0 : noiseValue;
            noiseValue = noiseValue > generation.Threshold ? Math.pow(noiseValue - generation.Threshold, generation.Dropoff) : 0;

            const height = noiseValue * generation.Height;
            positions[i + 2] = height;
            heights[j] = height;
        }

        geometry.computeVertexNormals();
        meshRef.current.geometry = geometry;
    }, [generation, noise]);

    return (
        <RigidBody type="fixed" colliders={false} rotation={[-Math.PI / 2, 0, 0]} >
            <mesh ref={meshRef} castShadow receiveShadow>
                <terrainShaderMaterial key={TerrainShaderMaterial.key} side={2}/>
            </mesh>
            
            <AnyCollider 
            rotation={[-Math.PI / 2, 0, 0]} 
            shape="heightfield"
                args={[
                    segments,
                    segments,
                    heights,
                    { x: terrainWidth, y: 1, z: terrainHeight }
                ]}
            />
        </RigidBody>
    );
};

export default Terrain;