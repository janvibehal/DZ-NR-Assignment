"use client";

import { useState } from "react";
import { User, Mail, Lock, Bell } from "lucide-react";

export default function SettingsPage() {

  const [name, setName] = useState("Anjali");
  const [email, setEmail] = useState("anjali@email.com");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // 👉 connect API later
    await new Promise((res) => setTimeout(res, 1000));

    setLoading(false);
    alert("Settings saved!");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-10">

      {/* PAGE CONTAINER */}
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-semibold mb-8">Settings</h1>

        {/* SETTINGS CARD */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-lg space-y-6">

          {/* NAME */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl
                         bg-[#1c1c1c] border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl
                         bg-[#1c1c1c] border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl
                         bg-[#1c1c1c] border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* NOTIFICATIONS */}
          <div className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <Bell size={18} />
              <span>Enable Notifications</span>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition ${
                notifications ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-orange-500 hover:bg-orange-600
                       transition font-medium"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>
      </div>
    </div>
  );
}
