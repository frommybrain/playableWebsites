import { create } from 'zustand'
import { toast } from 'react-toastify';

const useUserStore = create(set => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null, isLoggedIn: false });
    toast.success("You've been logged out");
  }
}));

export default useUserStore;
