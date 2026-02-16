"use client";

import { useState } from "react";

interface CreatorCardProps {
  creator: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    niche: string[];
    followers: string;
    bio: string;
    verified: boolean;
  };
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="group relative">
      {/* Glow Effect Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
      
      {/* Glass Card */}
      <div className="relative bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:scale-[1.02]">
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-6 space-y-5">
          
          {/* Header Section */}
          <div className="flex items-start gap-4">
            {/* Avatar with Glass Effect - Glow only on hover */}
            <div className="relative group/avatar">
              {/* Avatar Glow - Hidden by default, appears on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl opacity-0 group-hover/avatar:opacity-100 blur-sm transition-all duration-500" />
              
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400/90 via-orange-500/90 to-orange-600/90 backdrop-blur-sm p-[2px] group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-2xl bg-neutral-900/90 backdrop-blur-xl flex items-center justify-center border border-orange-500/20">
                  <span className="text-3xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    {creator.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              {/* Verified Badge */}
              {creator.verified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-neutral-900 shadow-lg shadow-orange-500/50 animate-pulse">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Name & Username */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-xl font-bold text-white truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                {creator.name}
              </h3>
              <p className="text-sm text-neutral-400 flex items-center gap-1">
                @{creator.username}
              </p>
            </div>
          </div>

          {/* Glass Niche Tags */}
          <div className="flex flex-wrap gap-2">
            {creator.niche.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white/5 backdrop-blur-md text-neutral-300 text-xs font-medium rounded-lg border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed">
            {creator.bio}
          </p>

          {/* Glass Stats Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm flex items-center justify-center border border-orange-500/20">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-white">{creator.followers}</p>
                <p className="text-xs text-neutral-500">Followers</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 hover:border-orange-500/30 flex items-center justify-center transition-all duration-300 group/btn">
                <svg className="w-4 h-4 text-neutral-400 group-hover/btn:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 hover:border-orange-500/30 flex items-center justify-center transition-all duration-300 group/btn">
                <svg className="w-4 h-4 text-neutral-400 group-hover/btn:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Glass Follow Button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`
              w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300
              ${
                isFollowing
                  ? "bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] border border-orange-400/20"
              }
            `}
          >
            {isFollowing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Following
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Follow
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}