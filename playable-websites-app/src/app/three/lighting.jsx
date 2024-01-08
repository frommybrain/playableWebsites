import { Environment } from "@react-three/drei";

const Lighting = () => {


    return (
        <>
            {/*<Environment preset="city" />*/}
            <directionalLight
                intensity={1.0}
                color={'#FFFFED'}
                castShadow
                shadow-bias={-0.0001}
                position={[-20, 50, 20]}
                shadow-camera-top={10}
                shadow-camera-right={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
            />
            <hemisphereLight intensity={1} />

            


        </>
    )
}

export default Lighting;