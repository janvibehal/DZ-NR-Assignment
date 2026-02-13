"use client";

import React, { useState, useEffect } from "react";
import PostCreator from "./PostCreator";
import PostCard from "./PostCard";
import { useAuth } from "../../context/AuthContext";

interface PostFromBackend {
  _id: string;
  author: { name: string; avatarUrl: string };
  feeling?: string;
  withUser?: string;
  createdAt: string;
  text: string;
  media?: { _id: string; url: string; type: "image" | "video" }[];
}

const MiddleContent: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<PostFromBackend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/posts", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main
      className={`
        ${className}
        flex-1 h-screen overflow-y-auto
        scrollbar-custom relative
      `}
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-center bg-cover opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop')",
        }}
      />

      {/* GLASS BLUR */}
      <div className="absolute inset-0 backdrop-blur-3xl -z-10" />

      {/* ORANGE GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[1200px] h-[500px]
          bg-gradient-to-t
          from-orange-500/40 via-orange-400/20 to-transparent
          blur-3xl opacity-70
        " />
      </div>

      {/* CENTER FEED */}
      <div className="relative w-full px-6 py-6 space-y-6">
        <PostCreator />

        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <PostCard key={idx} postId="" />
            ))
          : posts.map((post) => (
              <PostCard key={post._id} postId={post._id} />
            ))}
      </div>
    </main>
  );
};

export default MiddleContent;
