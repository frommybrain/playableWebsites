// userStore.js
import create from 'zustand'

const useUserStore = create(set => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  logout: () => set({ user: null, isLoggedIn: false })
}));

export default useUserStore;
