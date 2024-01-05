import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CheckerboardShader = shaderMaterial(
  { 
    color1: new THREE.Color("white"),
    color2: new THREE.Color("black"),
    scale: 10
  },
  /*glsl*/`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /*glsl*/`
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float scale;
    varying vec2 vUv;

    void main() {
      vec2 scaledUv = floor(vUv * scale);
      float checker = mod(scaledUv.x + scaledUv.y, 2.0);
      gl_FragColor = vec4(mix(color1, color2, checker), 1.0);
    }
  `
);

export default CheckerboardShader;