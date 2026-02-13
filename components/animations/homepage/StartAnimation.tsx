"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const StartAnimation = ({ onFinish }: { onFinish?: () => void }) => {

  const [step, setStep] = useState(0);
  
  useEffect(() => {

    const timeline = async () => {

      await delay(800);
      setStep(1);

      await delay(1400);
      setStep(2);

      await delay(1600);
      setStep(3);

      // ⭐ start slide-up exit
      await delay(2000);

      onFinish?.();
    };

    timeline();

  }, []);

  return (
    <motion.div
  initial={{ opacity: 1, y: 0 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ y: "-100%", opacity: 0 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
  className="
fixed inset-0 z-[99999]
flex items-center justify-center
overflow-hidden
pointer-events-auto
will-change-transform
"
style={{
        contain: "layout paint size",   // ⭐ prevents layout overflow
      }}
>


      {/* BACKGROUND OVERLAY */}
      <div className="
        absolute inset-0
        bg-gradient-to-br
        from-black/80
        via-black/70
        to-orange-900/40
        backdrop-blur-sm
      "/>

      <div className="relative w-full max-w-md px-6">

        <AnimatePresence>

          {step >= 1 && (
            <ChatBubble
              key="msg1"
              text="Hey 👋 Anyone here?"
              align="right"
            />
          )}

          {step === 2 && <TypingBubble key="typing" />}

          {step >= 3 && (
            <ChatBubble
              key="msg2"
              text="Welcome 🔥 Let's stay in the loop."
              align="left"
            />
          )}

        </AnimatePresence>

      </div>

    </motion.div>
  );
};

export default StartAnimation;


/* ================= CHAT BUBBLE ================= */

const ChatBubble = ({ text, align }: any) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`flex mb-4 ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          px-5 py-3 rounded-2xl text-sm max-w-[80%]
          backdrop-blur-xl border border-white/10
          ${align === "right"
            ? "bg-orange-500 text-white"
            : "bg-white/10 text-white"}
        `}
      >
        {text}
      </div>
    </motion.div>
  );
};


/* ================= TYPING ================= */

const TypingBubble = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="bg-white/10 px-4 py-3 rounded-2xl flex gap-1">

        {[0,1,2].map(i => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

      </div>
    </motion.div>
  );
};

const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
