import React from "react";
import "../Style/MyPageMainStyle.css";

  const SidebarItem = ({ icon, text }) => {
    return (
      <div className="flex items-center gap-2 pl-12 py-2 cursor-pointer opacity-70 hover:opacity-100">
        <div className="w-5 h-5 bg-gray-300 rounded" /> {/* 아이콘 자리 */}
        <span className="text-gray-600 font-bold text-sm">{text}</span>
      </div>
    );
  };

  const Sidebar = () => {
    return (
      <div className="w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <SidebarItem text="개인 정보" />
        <SidebarItem text="대여 내역 조회" />
        <SidebarItem text="찜 목록" />
        <SidebarItem text="물품 상태 체크" />
        <SidebarItem text="상품 회수 서비스" />
      </div>
    );
  };

  const Card = ({ title, subtitle, buttonText }) => {
    return (
      <div className="w-[676px] h-[459px] bg-white border border-gray-300 rounded-xl p-6 relative">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
        <button className="mt-6 px-6 py-2 bg-red-400 text-white rounded-full font-bold text-lg absolute bottom-6 left-1/2 transform -translate-x-1/2">
          {buttonText}
        </button>
      </div>
    );
  };

  const Dashboard = () => {
    return (
      <div className="flex w-full min-h-screen bg-gray-100 p-10 gap-6">
        <Sidebar />
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <Card
              title="가나디 회원님, 등급은 골드입니다."
              subtitle="현재 보유중인 포인트는 3,000점 입니다."
              buttonText="내역 보기"
            />
            <Card title="내 정보" subtitle="" buttonText="개인정보 수정" />
          </div>
          <Card title="주문 조회" subtitle="" buttonText="자세히 보기" />
        </div>
      </div>
    );
  };

  function MyPageMain() {
    return (
      <>
        <SidebarItem />
        <Card />
        <Dashboard />
        {/* <Sidebar /> */}
      </>
    );
  }
  
  export default MyPageMain;
  
