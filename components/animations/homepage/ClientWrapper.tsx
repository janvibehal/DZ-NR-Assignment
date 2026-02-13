"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import StartAnimation from "./StartAnimation";

export default function ClientWrapper({ children }: any) {

  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative">

      {/* MAIN APP ALWAYS RENDERED */}
      {children}

      {/* ANIMATION OVERLAY */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <StartAnimation onFinish={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
