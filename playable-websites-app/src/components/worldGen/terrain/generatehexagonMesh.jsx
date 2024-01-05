import * as THREE from 'three';

const generateHexagonMesh = (radius, divisions) => {
    const vertices = [];
    const indices = [];
    const segmentSize = radius / divisions;

    for (let row = 0; row <= divisions; row++) {
        for (let col = 0; col <= divisions; col++) {
            const x = col * segmentSize + (row % 2) * segmentSize / 2;
            const y = row * Math.sqrt(3) / 2 * segmentSize;
            
            if (isInsideHexagon(x, y, radius, segmentSize, divisions)) {
                vertices.push(x, y, 0); 
            } else {
                vertices.push(null, null, null); 
            }
        }
    }

    const colCount = divisions + 1;
    for (let row = 0; row < divisions; row++) {
        for (let col = 0; col < divisions; col++) {
            const a = row * colCount + col;
            const b = a + 1;
            const c = a + colCount;
            const d = c + 1;

            if (vertices[a * 3] !== null && vertices[b * 3] !== null && vertices[c * 3] !== null) {
                indices.push(a, b, c);
            }
            if (vertices[b * 3] !== null && vertices[c * 3] !== null && vertices[d * 3] !== null) {
                indices.push(b, c, d);
            }
        }
    }

    const filteredVertices = vertices.filter(v => v !== null);
    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(filteredVertices, 3));

    return geometry;
};

const isInsideHexagon = (x, y, radius, segmentSize, divisions) => {
    const hexWidth = radius * 2;
    const hexHeight = Math.sqrt(3) / 2 * hexWidth;

    const dx = x - radius;
    const dy = y - hexHeight / 2;
    const q2 = dx * dx * 3 / 4 + dy * dy;
    return q2 < (radius * radius);
};

export default generateHexagonMesh;
    