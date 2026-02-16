"use client";

import React, { useState, useEffect } from "react";
import { Search, Flame, Bell, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const { user, logout } = useAuth();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);

  const avatarSrc =
    user?.avatarUrl || `https://picsum.photos/200?random=${user?._id || 1}`;

  // ⭐ FETCH NOTIFICATIONS
  const fetchNotifications = async () => {

    if (!user?.token) return;

    try {

      const res = await fetch("/api/notifications", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      setNotifications(data.notifications || []);

    } catch (err) {

      console.log("Notification fetch error", err);

    }

  };

  // ⭐ AUTO REFRESH (simple polling)
  useEffect(() => {

    if (!user) return;

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);

  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] backdrop-blur-xl bg-black/70 border-b border-white/5">

      <div className="max-w-[1400px] mx-auto w-full">

        <div className="flex items-center justify-between px-6 py-2">

          {/* LEFT LOGO */}
          <div
            className="text-white font-bold text-xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            ADD LOGO HERE
          </div>

          {/* CENTER SEARCH */}
          <div className="flex-1 flex justify-center">

            <div className="relative w-[600px] max-w-full rounded-full p-[1px] bg-gradient-to-r from-orange-500/60 via-orange-400/30 to-transparent">

              <div className="flex items-center bg-[#111] rounded-full px-4 py-2">

                <Search className="w-4 h-4 text-gray-400 mr-3" />

                <input
                  placeholder="Find anything"
                  className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
                />

                <button className="flex items-center gap-1 text-orange-400 text-xs font-medium bg-black/40 px-3 py-1 rounded-full border border-orange-500/20">
                  <Flame className="w-4 h-4" />
                  Ask
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-3 relative">

            {!user && (
              <>
                <button className="bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-sm hover:bg-[#222]">
                  Get App
                </button>

                <button
                  onClick={() => router.push("/auth/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Log In
                </button>
              </>
            )}

            {user && (
              <>
                {/* ⭐ NOTIFICATIONS */}
                <div className="relative">

                  <button
                    onClick={() => setOpenNotifications(!openNotifications)}
                    className="relative p-2 rounded-full hover:bg-white/10"
                  >
                    <Bell className="w-5 h-5 text-white" />

                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                    )}

                  </button>

                  {/* ⭐ NOTIFICATION DROPDOWN */}
                  {openNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden">

                      <div className="p-3 border-b border-white/10 font-semibold text-white">
                        Notifications
                      </div>

                      <div className="max-h-[400px] overflow-y-auto">

                        {notifications.length === 0 && (
                          <div className="p-4 text-sm text-gray-400">
                            No notifications yet
                          </div>
                        )}

                        {notifications.map((n, i) => (

                          <div
                            key={i}
                            className="px-4 py-3 text-sm text-gray-300 hover:bg-white/5 border-b border-white/5"
                          >
                            {n.message}
                          </div>

                        ))}

                      </div>

                    </div>
                  )}

                </div>

                {/* PROFILE */}
                <div className="relative">

                  <img
                    src={avatarSrc}
                    className="w-9 h-9 rounded-full cursor-pointer border border-white/10 hover:border-orange-500/40 transition"
                    onClick={() => setOpenDropdown(!openDropdown)}
                  />

                  {openDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden">

                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white text-sm font-semibold">
                          {user.name}
                        </p>
                      </div>

                      <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                      >
                        <User className="w-4 h-4 mr-3" />
                        My Profile
                      </button>

                      <button
                        onClick={() => router.push("/settings")}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </button>

                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-white/5"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              </>
            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;
