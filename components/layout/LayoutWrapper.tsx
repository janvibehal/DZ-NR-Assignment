"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import SidebarLeft from "@/components/Sidebars/Sidebar-left";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/auth") ||   // login/signup pages
    pathname === "/login" ||
    pathname === "/signup";

  const hideScrollbar = {
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
  };

  // ⭐ AUTH PAGES (no navbar/sidebar)
  if (hideLayout) {
    return <>{children}</>;
  }

  // ⭐ NORMAL DASHBOARD PAGES
  return (
    <>
      <Navbar />

      <div className="flex pt-14">

        <div
          className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={hideScrollbar}
        >
          <SidebarLeft />
        </div>

        <div className="flex-1 min-w-0">
          {children}
        </div>

      </div>
    </>
  );
}
