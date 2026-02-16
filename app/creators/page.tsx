"use client";

import Hero from "@/components/creators/Hero";
import Filters from "@/components/creators/Filters";
import CreatorGrid from "@/components/creators/CreatorGrid";

export default function CreatorsPage() {

  return (
    <div className="min-h-screen bg-black">

      {/* CONTENT ONLY */}
      <div className="overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        <Hero />
        <Filters />
        <CreatorGrid />

      </div>

    </div>
  );
}
