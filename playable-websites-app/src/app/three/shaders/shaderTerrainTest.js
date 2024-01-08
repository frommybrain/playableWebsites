import { shaderMaterial } from "@react-three/drei";

const TerrainShaderMaterial = shaderMaterial(
  // Uniforms
  {},

 // Vertex Shader
/* glsl */ `
flat out vec3 vTransformedNormal;

void main() {
  vTransformedNormal = normalize(mat3(modelMatrix) * normal); // Transform the normal
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
,
// Fragment Shader
/* glsl */ `
flat in vec3 vTransformedNormal;

void main() {
  vec3 groundColor = vec3(0.918,0.871,0.82); // #9ea667 - base ground color
  vec3 cliffColor = vec3(0.769,0.435,0.38); // Gray color for cliffs

  // Calculate the angle of the normal relative to the global up vector
  float verticalAngle = degrees(acos(dot(normalize(vTransformedNormal), vec3(0, 1, 0))));

  // Use cliff color for near-vertical surfaces, ground color otherwise
  vec3 color;
  if (verticalAngle > 30.0 && verticalAngle < 135.0) {
    color = cliffColor;
  } else {
    color = groundColor;
  }
 
  gl_FragColor = vec4(color, 1.0);
}
`




);

export default TerrainShaderMaterial;
