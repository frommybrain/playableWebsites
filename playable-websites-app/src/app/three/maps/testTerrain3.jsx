import React, { useMemo, useRef, useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import generateTriangularMesh from '@/components/worldGen/utilities/generateTriangularMesh';
import useFBM from '@/hooks/useFBM';
import useTerrainStore from '@/app/zustand/terrainStore';
import CustomShaderMaterial from 'three-custom-shader-material';
import * as terrainShader from '../shaders/terrain/terrainShader'

const Terrain = () => {
    const { generation } = useTerrainStore();
    const noise = useFBM(generation.Scale);
    const meshRef = useRef();
    const materialRef = useRef();
    const verticalThreshold = 0.75;
    const sphereMeshRef = useRef();
    const cliffDiff = useTexture('images/tex/cliff/Stylized_Cliff_Rock_002_basecolor.jpg')
    const cliffNor = useTexture('images/tex/cliff/Stylized_Cliff_Rock_002_normal.jpg')
    const cliffRough = useTexture('images/tex/cliff/Stylized_Cliff_Rock_002_roughness.jpg')
    const cliffAO = useTexture('images/tex/cliff/Stylized_Cliff_Rock_002_ambientOcclusion.jpg')

    // Create and update geometry with noise
    const hexGeometry = useMemo(() => {
        const terrainSize = 256;
        const geometry = generateTriangularMesh(terrainSize, terrainSize);

        const positions = geometry.attributes.position.array;

        // Apply noise to vertices to create height on the Y-axis
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const z = positions[i + 2];
            let noiseValue = noise(x * generation.Scale, z * generation.Scale);

            noiseValue = isNaN(noiseValue) ? 0 : noiseValue;
            noiseValue = noiseValue > generation.Threshold ? Math.pow(noiseValue - generation.Threshold, generation.Dropoff) : 0;

            positions[i + 1] = noiseValue * generation.Height; // Apply height on the Y-axis
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        return geometry;
    }, [generation, noise]);


    // Calculate number of vertical vertices
    const countVerticalVertices = useMemo(() => {
        const normals = hexGeometry.attributes.normal.array;
        const numVertices = normals.length / 3;
        const verticalThreshold = 0.75;
        let count = 0;

        for (let i = 0; i < numVertices; i++) {
            const normalY = normals[i * 3 + 1];
            if (Math.abs(normalY) < verticalThreshold) {
                count++;
            }
        }

        return count;
    }, [hexGeometry]);

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.geometry = hexGeometry;
        }
    }, [hexGeometry]);

    useEffect(() => {
        if (sphereMeshRef.current) {
            const dummy = new THREE.Object3D();
            const positions = hexGeometry.attributes.position.array;
            const normals = hexGeometry.attributes.normal.array;
            let index = 0;

            for (let i = 0; i < positions.length / 3; i++) {
                const normalY = normals[i * 3 + 1];
    
                if (Math.abs(normalY) < verticalThreshold) {
                    dummy.position.set(
                        positions[i * 3],
                        positions[i * 3 + 1],
                        positions[i * 3 + 2]
                    );
                    dummy.updateMatrix();
                    sphereMeshRef.current.setMatrixAt(index++, dummy.matrix);
                }
            }
            sphereMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [hexGeometry]);
    
    
    

    return (
        <>
            <RigidBody type="fixed" colliders="trimesh">
                <group ref={meshRef} position={[0, 0, 0]}>
                    <mesh castShadow receiveShadow>
                        <primitive attach="geometry" object={hexGeometry} />
                        <CustomShaderMaterial
                            ref={materialRef}
                            baseMaterial={THREE.MeshStandardMaterial}
                            vertexShader={terrainShader.vert}
                            fragmentShader={terrainShader.frag}
                            uniforms={{
                                cliffDiffMap: { value: cliffDiff },
                                cliffNormalMap: { value: cliffNor }
                            }}
                            side={2}
                            roughness={0.1}
                            flatShading
                        />
                    </mesh>
                </group>
            </RigidBody>

            {/* Instanced spheres for all vertices */}
            <group scale={2}>
                <instancedMesh ref={sphereMeshRef} args={[null, null, countVerticalVertices]}>
                    <sphereGeometry args={[.1, 4, 4]} />
                    <meshBasicMaterial color="red" />
                </instancedMesh>
            </group>
            
        </>
    );
};

export default Terrain;
