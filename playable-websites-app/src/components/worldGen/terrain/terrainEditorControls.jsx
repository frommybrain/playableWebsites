import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
  VStack
} from '@chakra-ui/react';
import useTerrainStore from '@/app/zustand/terrainStore';

const TerrainEditor = () => {
  const { generation, setGeneration } = useTerrainStore();

  const updateGeneration = (key, value) => {
    setGeneration(key, value);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb="2">Height Factor: {generation.Height.toFixed(1)}</Text>
        <Slider
          min={0}
          max={35}
          step={0.1}
          defaultValue={generation.Height}
          onChange={(val) => updateGeneration('Height', val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      {/* Repeat similar blocks for 'noiseScale', 'threshold', 'dropoff' */}
      {/* Example for 'noiseScale': */}
      <Box>
        <Text mb="2">Noise Scale: {generation.Scale.toFixed(3)}</Text>
        <Slider
          min={0}
          max={0.4}
          step={0.001}
          defaultValue={generation.Scale}
          onChange={(val) => updateGeneration('Scale', val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Box>
        <Text mb="2">Threshold: {generation.Threshold.toFixed(3)}</Text>
        <Slider
          min={0}
          max={0.4}
          step={0.01}
          defaultValue={generation.Threshold}
          onChange={(val) => updateGeneration('Threshold', val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Box>
        <Text mb="2">Dropoff: {generation.Dropoff.toFixed(3)}</Text>
        <Slider
          min={0}
          max={2}
          step={0.1}
          defaultValue={generation.Dropoff}
          onChange={(val) => updateGeneration('Dropoff', val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

    </VStack>
  );
};

export default TerrainEditor;
