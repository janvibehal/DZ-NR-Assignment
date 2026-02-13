"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

const trendingTopics = [
  {
    tag: "AItools",
    category: "Tech",
    activity: "12.4k posts today",
  },
  {
    tag: "WebDesign",
    category: "Design",
    activity: "8.1k posts today",
  },
  {
    tag: "StartupLife",
    category: "Business",
    activity: "5.9k posts today",
  },
  {
    tag: "ReactJS",
    category: "Development",
    activity: "10.3k posts today",
  },
  {
    tag: "FitnessGoals",
    category: "Lifestyle",
    activity: "7.8k posts today",
  },
];

const SidebarRight = () => {
  return (
    <aside className="w-80 hidden lg:block">

      <div className="sticky top-20 space-y-6">

        {/* TRENDING TOPICS CARD */}
        <div
          className="
          relative
          bg-black/40
          backdrop-blur-2xl
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]
          p-5
        "
        >

          {/* ORANGE AMBIENT GLOW */}
          <div
            className="
            absolute bottom-[-120px] left-1/2 -translate-x-1/2
            w-[300px] h-[200px]
            bg-orange-500/20
            blur-[120px]
            pointer-events-none
          "
          />

          {/* HEADER */}
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Trending Topics
            </h3>
          </div>

          {/* LIST */}
          <div className="space-y-3">

            {trendingTopics.map((topic, index) => (
              <div
                key={topic.tag}
                className="
                group
                rounded-xl
                p-3
                cursor-pointer
                hover:bg-white/5
                transition-all
              "
              >

                <p className="text-white font-semibold text-sm group-hover:text-orange-400 transition">
                  #{topic.tag}
                </p>

                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{topic.category}</span>
                  <span>{topic.activity}</span>
                </div>

              </div>
            ))}

          </div>

          <button className="text-sm text-orange-400 mt-4 hover:text-orange-300">
            See more
          </button>

        </div>

      </div>

    </aside>
  );
};

export default SidebarRight;
