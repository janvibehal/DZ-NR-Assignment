"use client";

import { useAuth } from "@/context/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PostCard from "@/components/posts/PostCard";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts/user/${user._id}`);
        const data = await res.json();
        console.log("API RESPONSE:", data);

        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false); // ⭐ THIS WAS MISSING
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-24 text-center text-gray-400">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <main className="pt-20 px-6 max-w-6xl mx-auto text-white space-y-6">
      <ProfileHeader user={user} postsCount={posts.length} />

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center text-gray-400 mt-10">
          Loading posts...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No posts yet.
        </div>
      )}

      {/* POSTS LIST */}
      {!loading && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map(post => {
            console.log("RENDERING POST:", post);
            return <PostCard key={post._id} postId={post._id} />;
          })}

        </div>
      )}
    </main>
  );
}
