import { create } from "zustand";

const userStore = create((set) => ({
  user_id: null,

  login: (username) => set(() => ({ user_id: username })),

  logout: () => set(() => ({ user_id: null })),
}));

export default userStore;
