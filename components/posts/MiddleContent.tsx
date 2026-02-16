"use client";

import React, { useState, useEffect } from "react";
import PostCreator from "./PostCreator";
import PostCard from "./PostCard";
import { useAuth } from "../../context/AuthContext";

interface PostFromBackend {
  _id: string;
  title?: string;
  content: string;
  authorId: {
    name: string;
    email: string;
  };
  createdAt: string;
}

const MiddleContent: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<PostFromBackend[]>([]);
  const [loading, setLoading] = useState(true);

  // ⭐ FETCH POSTS ONLY IF LOGGED IN
  const fetchPosts = async () => {
    if (!user) return; // 🔥 STOP if not logged in

    try {
      setLoading(true);

      const token = user?.token;

      const res = await fetch("/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <main
      className={`
        ${className}
        flex-1 min-h-full overflow-y-auto
        scrollbar-custom relative
      `}
    >
      {/* BACKGROUND WRAPPER */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-black" />

        <div
          className="
            absolute bottom-[-200px] left-1/2 -translate-x-1/2
            w-[1200px] h-[600px]
            bg-orange-500/25
            blur-[140px]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* ⭐ IF NOT LOGGED IN → HIDE POSTS */}
      {!user ? (
        <div className="relative flex items-center justify-center h-full text-gray-400 pt-10">
          Please login to view/create posts 🙂
        </div>
      ) : (
        <div className="relative w-full px-6 py-6 space-y-6">
          <PostCreator onPostCreated={fetchPosts} />

          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <PostCard key={idx} postId="" />
              ))
            : posts.map((post) => (
                <PostCard key={post._id} postId={post._id} />
              ))}
        </div>
      )}
    </main>
  );
};

export default MiddleContent;
