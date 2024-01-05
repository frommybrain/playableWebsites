// inspo from https://codesandbox.io/p/sandbox/hexterrain-forked-4qhv38
import { useMemo } from "react";
import { MathUtils, Vector2 } from "three";
import { FBM } from 'three-noise';
import useTerrainStore from "@/app/zustand/terrainStore";

export default function useFBM(noiseScale) {
    const generation = useTerrainStore((s) => s.generation);

    const fbm = useMemo(
        () =>
        new FBM({
            seed: generation.Seed,
            //lacunarity: detail * 4,
            //persistance: fuzzyness * 2,
            octaves: 1, 
            redistribution: generation.Redistribution 
        }),
        
        // Recreate the FBM instance when generation settings change
        [generation]
    );

    return (x, y) => {
        const scaledX = x * noiseScale;
        const scaledY = y * noiseScale;

        // Compute noise value
        const noiseValue = fbm.get2(new Vector2(scaledX, scaledY));
        
        // Map and adjust the noise value as needed
        return Math.pow(MathUtils.mapLinear(noiseValue, -1, 1, 0, 1), 2);
    };
}
