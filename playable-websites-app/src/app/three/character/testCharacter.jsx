import { Decal, useTexture } from "@react-three/drei";

const TestCharacter = () => {

    const decalBack = useTexture('images/fmbOutline.png');
    const decalFront = useTexture('images/fmbFace.png');
    return (
        <>
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#f9f9f9" />
                <Decal
                    position={[0, 0, 0.5]} 
                    rotation={0} 
                    scale={1} 
                >
                    <meshStandardMaterial
                        map={decalFront}
                        polygonOffset
                        polygonOffsetFactor={-1} 
                    />
                </Decal>
                <Decal
                    position={[0.2, 0.1, -0.5]} 
                    rotation={-0.3} 
                    scale={0.45} 
                >
                    <meshStandardMaterial
                        map={decalBack}
                        transparent={true}
                        roughness={0.03}
                        polygonOffset
                        polygonOffsetFactor={-1} 
                    />
                </Decal>
                
            </mesh>
        </>
    )
}

export default TestCharacter;