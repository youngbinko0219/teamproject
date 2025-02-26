// src/hooks/useUserStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user_id: null,  // 사용자 아이디
  user_name: "",  // 사용자 이름
  user_gender: "",  // 사용자 성별
  created_at: "",  // 가입일
  points: 0,  // 포인트
  grade_name: "",  // 회원 등급

  // 로그인 시 user_id와 기본 정보를 설정
  login: (user_id, user_name, user_gender, created_at) => set(() => ({
    user_id,
    user_name,
    user_gender,
    created_at
  })),

  // 포인트 및 등급을 설정
  setPointsAndGrade: (points, grade_name) => set(() => ({
    points,
    grade_name
  })),

  // 로그아웃 시 모든 정보 초기화
  logout: () => set(() => ({
    user_id: null,
    user_name: "",
    user_gender: "",
    created_at: "",
    points: 0,
    grade_name: ""
  }))
}));

export default useUserStore;
