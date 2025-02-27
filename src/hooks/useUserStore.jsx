import { create } from 'zustand';

const useUserStore = create((set) => ({
  user_id: null,
  user_name: "",
  user_gender: "",
  created_at: "",
  points: 0,
  grade_name: "",

  login: (user_id, user_name, user_gender, created_at) => set(() => ({
    user_id,
    user_name,
    user_gender,
    created_at
  })),

  setPointsAndGrade: (points, grade_name) => set(() => ({
    points,
    grade_name
  })),

  logout: () => set(() => ({
    user_id: null,
    user_name: "",
    user_gender: "",
    created_at: "",
    points: 0,
    grade_name: ""
  })),

  // 새로운 함수 추가: 사용자 정보를 업데이트
  setUserInfo: (userData) => set(() => ({
    ...userData
  })),
}));

export default useUserStore;
