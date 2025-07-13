import { create } from 'zustand';

type AuthStore = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  login: () => set({ isAuth: true }),
  logout: () => set({ isAuth: false }),
}));

export default useAuthStore;
