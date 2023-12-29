// scoreStore.js
import create from 'zustand'

const useScoreStore = create(set => ({
  score: 0,
  increaseScore: () => set(state => ({ score: state.score + 1 })),
  decreaseScore: () => set(state => ({ score: state.score - 1 })),
  setScore: (newScore) => set({ score: newScore })
}),
{
  name: 'user-score', 
  getStorage: () => localStorage, 
}
)

export default useScoreStore;