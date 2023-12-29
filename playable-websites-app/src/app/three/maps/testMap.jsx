import { RigidBody } from '@react-three/rapier'


const TestMap = () => {

    return (
        <>
            <RigidBody type="fixed" colliders="trimesh">

                <group position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh castShadow receiveShadow>
                        <planeGeometry args={[50, 50, 10, 10]} />
                        <meshStandardMaterial color="grey" />
                    </mesh>
                </group>
            </RigidBody>
        </>
    )
}

export default TestMap;