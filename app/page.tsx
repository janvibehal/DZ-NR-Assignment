"use client";

import SidebarLeft from "../components/Sidebar-left";
import SidebarRight from "../components/Sidebar-right";
import MiddleContent from "../components/posts/MiddleContent";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Left Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 h-screen fixed top-0 left-0">
        <SidebarLeft />
      </aside>

      {/* Left Sidebar for mobile (top-right) */}
      <div className="md:hidden fixed top-16 right-4 z-[9999]">
        <SidebarLeft />
      </div>

      {/* Middle Content fetches posts from backend */}
      <MiddleContent className="flex-1 mx-auto md:ml-64 md:mr-64" />

      {/* Right Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 h-screen fixed top-0 right-0">
        <SidebarRight />
      </aside>
    </div>
  );
}
