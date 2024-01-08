export const vert = /* glsl */ `
out vec3 vTransformedNormal;

void main() {
  vTransformedNormal = normalize(mat3(modelMatrix) * normal);
  csm_Position = position * vec3(2.0);
}
`
export const frag = /* glsl */ `
in vec3 vTransformedNormal;

void main() {
  vec3 groundColor = vec3(0.918,0.871,0.82); // Base ground color
  vec3 cliffColor = vec3(0.769,0.435,0.38); // Gray color for cliffs

  float verticalAngle = degrees(acos(dot(normalize(vTransformedNormal), vec3(0, 1, 0))));

  vec3 color;
  if (verticalAngle > 30.0 && verticalAngle < 135.0) {
    color = cliffColor;
  } else {
    color = groundColor;
  }

  csm_DiffuseColor = vec4(color, 1.0);
}
`