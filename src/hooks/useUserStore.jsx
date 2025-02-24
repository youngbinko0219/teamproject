import { create } from "zustand";

const useUserStore = create((set) => ({
  //사용자 아이디저장
  user_id: null,

  //로그인시 user_id저장
  login: (username) => set(() => ({ user_id: username })),

  //로그아웃시 user_id제거
  logout: () => set(() => ({ user_id: null })),

  //사용자 정보 저장
  userInfo: null,

  //사용자 정보 가져오기
  setUserInfo: (data) => set({ userInfo: data }),
}));

export default useUserStore;
