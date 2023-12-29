

const TestCharacter = () => {

    return (
        <>
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </>
    )
}

export default TestCharacter;