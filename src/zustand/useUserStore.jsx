import { create } from "zustand";

const useUserStore = create((set) => ({
  user_id: null,

  login: (username) => set(() => ({ user_id: username })),

  logout: () => set(() => ({ user_id: null })),
}));

export default useUserStore;
