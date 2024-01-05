// inspo taken from https://codesandbox.io/p/sandbox/hexterrain-forked-4qhv38
import { create } from "zustand";
import { produce } from "immer";

// Utility functions
const saveState = (state) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('terrainState', JSON.stringify(state));
    }
  };
  
  const loadState = () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('terrainState');
      return savedState ? JSON.parse(savedState) : undefined;
    }
    return undefined;
  };

const water = "#5EBFB5";
const colorMap = [
    "#FCE0AE", 
    "#F2B591",
    "#A7A267",
    "#656347",
    "#9AA7AD"
];

const defaultState = {
    colors: {
        Water: { value: 0.21, color: "#00a9ff" },
        Shore: { value: 0.01, color: "#ffd68f" },
    },
    generation: {
        Seed: Math.random(),
        Height: 1,
        Scale: 0.2,
        Threshold: 0.3,
        Dropoff: 2,
        Redistribution: 1
    },
    general: {
        Trees: false,
        Grass: false,
        Clouds: false
    },
    editorMode: false,

};

const useTerrainStore = create(set => {
    const initialState = loadState() || defaultState;

    return {
        ...initialState,
        setColorValue: (key, value) =>
            set(
                produce((state) => {
                    state.colors[key].value = value;
                    saveState(state);
                })
            ),
        setColor: (key, color) =>
            set(
                produce((state) => {
                    state.colors[key].color = color;
                    saveState(state);
                })
            ),
        setGeneration: (key, value) =>
            set(
                produce((state) => {
                    state.generation[key] = value;
                    saveState(state);
                })
            ),
        setGeneral: (key, value) =>
            set(
                produce((state) => {
                    state.general[key] = value;
                    saveState(state);
                })
            ),
        toggleEditorMode: () =>
            set(
                produce((state) => {
                    state.editorMode = !state.editorMode;
                    saveState(state);
                })
            )
    };
});

export default useTerrainStore;
