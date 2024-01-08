// useRaycast.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const useRaycast = (meshRef, camera, callback) => {
    const raycaster = new THREE.Raycaster();
    const mouse = useRef(new THREE.Vector2());

    const onDocumentMouseMove = (event) => {
        event.preventDefault();
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    useEffect(() => {
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        return () => {
            document.removeEventListener('mousemove', onDocumentMouseMove, false);
        };
    }, []);

    useFrame(() => {
        if (!meshRef.current || !camera) return;

        raycaster.setFromCamera(mouse.current, camera);
        const intersects = raycaster.intersectObject(meshRef.current, true);
        if (intersects.length > 0 && callback) {
            callback(intersects[0]);
        }
    });

    return null; // Custom hooks don't return JSX
};

export default useRaycast;
