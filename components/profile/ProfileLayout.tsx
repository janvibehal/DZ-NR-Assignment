"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {

  return (

    <div className="w-full max-w-4xl mx-auto py-10 text-white">

      {/* PROFILE PAGE WRAPPER */}
      <div className="space-y-6">

        {children}

      </div>

    </div>

  );
}
