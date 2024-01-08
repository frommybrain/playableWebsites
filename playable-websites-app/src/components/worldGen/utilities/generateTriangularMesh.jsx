import * as THREE from 'three';

function generateTriangularMesh(rows, cols) {
    const vertices = [];
    const triangles = [];
    const size = 1; // The size of the individual triangles

    // Calculate the total width and depth of the grid
    const totalWidth = cols * size;
    const totalDepth = rows * (Math.sqrt(3) / 2) * size;

    // Calculate the center offset
    const centerX = totalWidth / 2;
    const centerZ = totalDepth / 2;

    // Generate vertices
    for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
            // Calculate the position of each vertex
            const posX = x * size - centerX;
            const posZ = y * (Math.sqrt(3) / 2) * size - centerZ;
            vertices.push(new THREE.Vector3(posX, 0, posZ)); // Y is always 0, as we are now on XZ plane
        }
    }

    // Generate triangles
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const current = y * (cols + 1) + x;
            const next = current + (cols + 1);

            // Add triangles for every row
            triangles.push(current, next + 1, next);
            triangles.push(current, current + 1, next + 1);
        }
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const verticesFlat = vertices.flatMap(v => [v.x, v.y, v.z]);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verticesFlat, 3));
    geometry.setIndex(triangles);
    geometry.computeVertexNormals();

    return geometry;
}

export default generateTriangularMesh;
