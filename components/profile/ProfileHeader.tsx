"use client";

export default function ProfileHeader({ user, postsCount }: any) {
  return (
    <section className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">

      <div className="h-40 bg-gradient-to-r from-orange-500/40 to-purple-600/40" />

      <div className="px-6 pb-6">
        <div className="-mt-12 flex items-end gap-4">

          <img
            src={user.avatarUrl}
            className="w-24 h-24 rounded-full border-4 border-black object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400 text-sm">@{user.username}</p>
          </div>
        </div>

        <p className="mt-4 text-gray-300 max-w-xl">
          {user.bio || "No bio added yet."}
        </p>

        <div className="flex gap-6 mt-4 text-sm">
          <span><b>{postsCount}</b> Posts</span>
          <span><b>{user.followersCount || 0}</b> Followers</span>
          <span><b>{user.followingCount || 0}</b> Following</span>
        </div>

      </div>
    </section>
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function ProfileHeader({
  profile,
  userId,
  refreshProfile,
}: any) {
  const { user } = useAuth();

  const [following, setFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  // ⭐ AUTO SYNC FOLLOW STATE FROM PROFILE DATA
  useEffect(() => {
    if (!profile || !user) return;

    const isFollowing = profile.followers?.includes(user._id);

    setFollowing(isFollowing);
  }, [profile, user]);

  // ⭐ FOLLOW / UNFOLLOW HANDLER
  const handleFollow = async () => {
    try {
      if (!user?.token) {
        console.log("NO TOKEN AVAILABLE");
        return;
      }

      setLoadingFollow(true);

      const res = await fetch(`/api/users/${userId}/follow`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      console.log("FOLLOW RESPONSE:", data);

      if (!res.ok) {
        throw new Error("Follow failed");
      }

      // update button immediately
      setFollowing(data.following);

      // refresh profile (updates followers count)
      refreshProfile?.();
    } catch (err) {
      console.error("❌ Follow error:", err);
    } finally {
      setLoadingFollow(false);
    }
  };

  return (
    <div className="bg-[#111] rounded-xl p-6">
      <div className="flex items-center gap-4">
        <img
          src={
            profile?.avatarUrl || `https://picsum.photos/100?random=${userId}`
          }
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          {/* NAME */}
          <h1 className="text-xl font-semibold">{profile?.name}</h1>

          {/* BIO */}
          <p className="text-gray-400 text-sm">
            {profile?.bio || "No bio yet"}
          </p>

          {/* FOLLOW + MESSAGE BUTTONS */}
          {user?._id !== userId && (
            <div className="flex gap-3 mt-3">
              {/* FOLLOW BUTTON */}
              <button
                onClick={handleFollow}
                disabled={loadingFollow}
                className="bg-orange-500 px-4 py-2 rounded-lg"
              >
                {loadingFollow
                  ? "Loading..."
                  : following
                    ? "Following"
                    : "Follow"}
              </button>

              {/* MESSAGE BUTTON */}
              <button
                onClick={async () => {
                  if (!user?.token) return;

                  const res = await fetch("/api/conversations", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ otherUserId: userId }),
                  });

                  const data = await res.json();

                  if (res.ok) {
                    // ⭐ trigger global messaging open
                    window.dispatchEvent(
                      new CustomEvent("openChat", {
                        detail: {
                          _id: userId,
                          name: profile?.name,
                          profilePicture: profile?.avatarUrl,
                        },
                      }),
                    );
                  } else {
                    alert("You must follow each other to message");
                  }
                }}
                className="border border-white/20 px-4 py-2 rounded-lg"
              >
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
