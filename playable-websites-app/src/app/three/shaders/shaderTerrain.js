import { shaderMaterial } from "@react-three/drei"

const TerrainShaderMaterial = shaderMaterial(
    {},
  
    // Vertex Shader
    /*glsl*/`
      varying float vHeight;
      void main() {
        vHeight = position.z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  
    // Fragment Shader
    /*glsl*/`
    varying float vHeight;
void main() {
    vec3 lowColor = vec3(0, 1, 0); // Green
    vec3 midColor = vec3(0.6, 0.4, 0.2); // Brown
    vec3 highColor = vec3(1, 1, 1); // White

    // Lower this threshold to allow brown to start appearing at lower heights
    float lowMidThreshold = 0.0; // Height where transition from low to mid starts

    float midThreshold = 0.5; // Height where transition from low to mid ends and mid to high starts
    float highThreshold = 2.5; // Height where transition from mid to high starts

    vec3 color;
    if (vHeight < lowMidThreshold) {
        color = lowColor;
    } else if (vHeight < midThreshold) {
        float factor = (vHeight - lowMidThreshold) / (midThreshold - lowMidThreshold);
        color = mix(lowColor, midColor, factor); // Smooth transition from low to mid
    } else if (vHeight < highThreshold) {
        float factor = (vHeight - midThreshold) / (highThreshold - midThreshold);
        color = mix(midColor, highColor, factor); // Smooth transition from mid to high
    } else {
        color = highColor;
    }
    gl_FragColor = vec4(color, 1.0);
}

    
    `
  )

  export default TerrainShaderMaterial;
  