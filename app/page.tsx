"use client";

import SidebarRight from "../components/Sidebars/Sidebar-right";
import MiddleContent from "../components/posts/MiddleContent";

export default function Home() {

  const hideScrollbar = {
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
  };

  return (
    <div className="flex">

      {/* CENTER CONTENT */}
      <div className="flex-1 min-w-0 transition-all duration-300">
        <MiddleContent />
      </div>

      {/* RIGHT SIDEBAR (LOCAL TO THIS PAGE ONLY) */}
      <div
        className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={hideScrollbar}
      >
        <SidebarRight />
      </div>

    </div>
  );
}
