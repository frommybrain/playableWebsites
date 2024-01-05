import { RigidBody } from '@react-three/rapier'
import CheckerboardShader from '../shaders/shaderCheckerboard';
import { extend } from '@react-three/fiber';

extend({ CheckerboardShader });


const TestMap = () => {

    return (
        <>
            <RigidBody type="fixed" colliders="trimesh">

                <group position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh castShadow receiveShadow>
                        <planeGeometry args={[50, 50, 10, 10]} />
                        <checkerboardShader key={CheckerboardShader.key} attach="material" color1="#FFFFFF" color2="hotpink" scale={30} />
                    </mesh>
                </group>
            </RigidBody>
        </>
    )
}

export default TestMap;