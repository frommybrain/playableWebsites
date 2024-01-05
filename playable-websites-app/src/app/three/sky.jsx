import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const uniforms = {
  time: { value: 0 },
  resolution: new THREE.Vector2(),
  cloudscale: { value: 1.1 },
  speed: { value: 0.03 },
  clouddark: { value: 0.5 },
  cloudlight: { value: 0.3 },
  cloudcover: { value: 0.2 },
  cloudalpha: { value: 8.0 },
  skytint: { value: 0.5 },

};

const SkyMaterial = shaderMaterial(
  uniforms,
// vertex shader
/*glsl*/`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
// fragment shader
/*glsl*/`
uniform float time;
uniform vec2 resolution;
uniform float cloudscale;
uniform float speed;
uniform float clouddark;
uniform float cloudlight;
uniform float cloudcover;
uniform float cloudalpha;
uniform float skytint;
vec3 skycolour1 = vec3(0.286,0.737,0.925);
vec3 skycolour2 = vec3(0.286,0.737,0.925);

varying vec2 vUv;

const mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );

vec2 hash( vec2 p ) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x+p.y)*K1);  
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0)); 
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.1;
    for (int i = 0; i < 7; i++) {
        total += noise(n) * amplitude;
        n = m * n;
        amplitude *= 0.4;
    }
    return total;
}

void main() {
    vec2 p = vUv;
    vec2 uv = p*vec2(resolution.x/resolution.y,1.0);    
    float t = time * speed;
    float q = fbm(uv * cloudscale * 0.5);
    
    float r = 0.0;
    uv *= cloudscale;
    uv -= q - t;
    float weight = 0.8;
    for (int i=0; i<8; i++){
        r += abs(weight*noise( uv ));
        uv = m*uv + t;
        weight *= 0.7;
    }
    
    float f = 0.0;
    uv = p*vec2(resolution.x/resolution.y,1.0);
    uv *= cloudscale;
    uv -= q - t;
    weight = 0.7;
    for (int i=0; i<8; i++){
        f += weight*noise( uv );
        uv = m*uv + t;
        weight *= 0.6;
    }
    
    f *= r + f;
    
    float c = 0.0;
    t = time * speed * 2.0;
    uv = p*vec2(resolution.x/resolution.y,1.0);
    uv *= cloudscale*2.0;
    uv -= q - t;
    weight = 0.4;
    for (int i=0; i<7; i++){
        c += weight*noise( uv );
        uv = m*uv + t;
        weight *= 0.6;
    }
    
    float c1 = 0.0;
    t = time * speed * 3.0;
    uv = p*vec2(resolution.x/resolution.y,1.0);
    uv *= cloudscale*3.0;
    uv -= q - t;
    weight = 0.4;
    for (int i=0; i<7; i++){
        c1 += abs(weight*noise( uv ));
        uv = m*uv + t;
        weight *= 0.6;
    }
    
    c += c1;
    
    vec3 skycolour = mix(skycolour2, skycolour1, p.y);
    vec3 cloudcolour = vec3(1.1, 1.1, 0.9) * clamp((clouddark + cloudlight*c), 0.0, 1.0);
   
    f = cloudcover + cloudalpha*f*r;
    
    vec3 result = mix(skycolour, clamp(skytint * skycolour + cloudcolour, 0.0, 1.0), clamp(f + c, 0.0, 1.0));
    
    gl_FragColor = vec4( result, 1.0 );
}
`
)

extend({ SkyMaterial })


const SkySphere = () => {
  const ref = useRef();

  useFrame(({ clock, size }) => {
    if (ref.current) {
      ref.current.uniforms.time.value = clock.getElapsedTime();
      ref.current.uniforms.resolution.value.set(size.width, size.height);
    }
  });

  const uniformValues = {
    cloudscale: 2.0,
    speed: 0.06,
    clouddark: 0.5,
    cloudlight: 0.3,
    cloudcover: 0.1,
    cloudalpha: 8.0,
    skytint: 0.5,
  };
  

  return (
    <mesh>
      <sphereGeometry args={[200, 8, 8]} />
      <skyMaterial 
        attach="material" 
        ref={ref} 
        key={SkyMaterial.key}
        {...uniformValues} 
        side={THREE.DoubleSide}
      />    
      </mesh>
  );
};

export default SkySphere;

