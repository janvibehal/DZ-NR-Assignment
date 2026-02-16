"use client";

import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Comment from "../comments/Comment";
import PostCardSkeleton from "./PostCardSkeleton";
import CommentSkeleton from "../comments/CommentSkeleton";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

interface MediaItem {
  id: string;
  url: string;
  type: string;
}

interface CommentType {
  id: string;
  author: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  replies?: CommentType[];
}

interface PostData {
  id: string;
  authorId: string;
  userAvatarUrl: string;
  name: string;
  feeling?: string;
  withUser?: any;
  postDate: string;
  postText: string;
  media: MediaItem[];
  likes: { _id: string; name: string }[];
  comments: CommentType[];
}

interface PostCardProps {
  postId: string;
}

const PostCard: React.FC<PostCardProps> = ({ postId }) => {

  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [post, setPost] = useState<PostData | null>(null);

  const postLiked =
    post?.likes.some((like) => like._id === user?._id) || false;

  const totalLikesCount = post?.likes.length || 0;

  useEffect(() => {

    const fetchPost = async () => {

      if (!postId) return;

      try {

        setLoading(true);

        const res = await fetch(`/api/posts/${postId}`, {
          headers: user?.token
            ? { Authorization: `Bearer ${user.token}` }
            : {},
        });

        if (!res.ok) throw new Error("Failed to fetch post");

        const data = await res.json();
        const postData = data.post || data;

        setPost({
          id: postData._id,
          authorId: postData.author?._id,

          userAvatarUrl:
            postData.author?.avatarUrl ||
            `https://picsum.photos/50?random=${postData._id}`,

          name: postData.author?.name || "Unknown User",

          feeling: postData.feeling,

          withUser:
            typeof postData.withUser === "object"
              ? postData.withUser.name
              : postData.withUser,

          postDate: new Date(postData.createdAt).toLocaleString(),

          postText: postData.text,

          media:
            postData.media?.map((m: any) => ({
              id: m._id,
              url: m.url,
              type: m.type,
            })) || [],

          likes: postData.likes || [],

          comments:
            postData.comments?.map((c: any) => ({
              id: c._id,
              author: {
                _id: c.author?._id || "",
                name: c.author?.name || "Unknown",
                avatarUrl:
                  c.author?.avatarUrl ||
                  `https://picsum.photos/50?random=${c._id}`,
              },
              text: c.text,
              replies: c.replies || [],
            })) || [],
        });

      } catch (err) {
        console.error("Error fetching post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

  }, [postId, user?.token]);

  const togglePostLike = async () => {
    if (!post || !user?.token) return;

    const isLiked = postLiked;

    setPost((prev) => {
      if (!prev) return null;

      const updatedLikes = isLiked
        ? prev.likes.filter((like) => like._id !== user._id)
        : [...prev.likes, { _id: user._id, name: user.name }];

      return { ...prev, likes: updatedLikes };
    });

    try {

      await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      });

    } catch (err) {

      console.error("Failed to toggle like:", err);

    }
  };

  if (loading || !post)
    return (
      <div className="mb-6">
        <PostCardSkeleton />
        <CommentSkeleton />
      </div>
    );

  return (
    <div className="relative rounded-xl p-[1px] mb-6 bg-gradient-to-b from-orange-500/20 via-transparent to-transparent">

      <div className="bg-[#0c0c0c] backdrop-blur-xl rounded-xl shadow-2xl border border-white/5 p-4 w-full mx-auto relative overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center mb-3">

          <img
            src={post.userAvatarUrl}
            className="w-10 h-10 rounded-lg object-cover mr-3 cursor-pointer"
            onClick={() => router.push(`/profile/${post.authorId}`)}
          />

          <div
            className="cursor-pointer"
            onClick={() => router.push(`/profile/${post.authorId}`)}
          >
            <div className="text-white font-semibold text-sm">

              {post.name}

              {post.feeling && (
                <span className="ml-1 text-gray-300">
                  is feeling {post.feeling}
                </span>
              )}

              {post.withUser && (
                <span className="ml-1 text-gray-300">
                  with <span className="font-semibold">{post.withUser}</span>
                </span>
              )}

            </div>

            <div className="text-gray-400 text-xs">
              {post.postDate}
            </div>
          </div>

        </div>

        {/* TEXT */}
        <p className="text-gray-200 mb-3 text-sm whitespace-pre-wrap">
          {post.postText}
        </p>

        {/* MEDIA */}
        {post.media.length > 0 && (

          <div className={`grid gap-2 mb-4 ${post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>

            {post.media.map((item) => (

              <div key={item.id} className="relative w-full h-52">

                {item.type === "video" ? (
                  <video
                    controls
                    src={item.url}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <img
                    src={item.url}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}

              </div>
            ))}

          </div>

        )}

        {/* ACTION BAR */}
        <div className="flex justify-around border-y border-white/10 py-2 mb-3">

          <button onClick={togglePostLike} className={postLiked ? "text-red-500":"text-gray-400"}>
            <Heart fill={postLiked ? "currentColor":"none"} />
          </button>

          <button onClick={()=>setShowComments(!showComments)}>
            <MessageCircle />
          </button>

          <button disabled={sharing}>
            <Share2 />
          </button>

        </div>

        {/* LIKES */}
        {totalLikesCount > 0 && (
          <div className="text-xs text-gray-300 mb-3">
            ❤️ {totalLikesCount} likes
          </div>
        )}

        {/* COMMENTS */}
        {showComments && (
          <Comment
            currentUserCommentAvatar={`https://picsum.photos/50?random=1`}
            postId={postId}
          />
        )}

      </div>
    </div>
  );
};

export default PostCard;
