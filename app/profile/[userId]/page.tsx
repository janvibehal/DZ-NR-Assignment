"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePosts from "@/components/profile/ProfilePosts";

export default function ProfilePage() {

  const params = useParams();
  const userId = params?.userId as string;

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ⭐ fetch profile + posts
  const fetchProfile = async () => {

    try {

      setLoading(true);

      const [userRes, postRes] = await Promise.all([
        fetch(`/api/users/${userId}`),
        fetch(`/api/posts?userId=${userId}`)
      ]);

      const userData = await userRes.json();
      const postData = await postRes.json();

      console.log("PROFILE FETCHED:", userData);

      setProfile(userData);
      setPosts(postData);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (userId) fetchProfile();

  }, [userId]);

  if (loading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (

    <div className="w-full max-w-4xl mx-auto py-10 text-white space-y-6">

      <ProfileHeader
        profile={profile}
        userId={userId}
        refreshProfile={fetchProfile}
      />

      <ProfilePosts posts={posts} />

    </div>

  );
}
