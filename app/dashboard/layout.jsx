"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";

function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState({});

  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="hidden md:block h-screen bg-white fixed w-64">
          <SideNav />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-h-screen">
          <Header />
          <div className="md:ml-64 p-10">{children}</div>
        </div>
      </div>
    </VideoDataContext.Provider>
  );
}

export default DashboardLayout;
