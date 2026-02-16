"use client";

import { useRouter } from "next/navigation";

export default function ProfilePosts({ posts }: any) {

  const router = useRouter();

  if (!posts?.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No posts yet.
      </div>
    );
  }

  return (

    <div className="grid grid-cols-3 gap-2">

      {posts.map((post: any) => {

        // ⭐ take first media as preview
        const previewMedia = post.media?.[0];

        return (

          <div
            key={post._id}
            className="
              relative
              aspect-square
              bg-[#111]
              cursor-pointer
              group
              overflow-hidden
              rounded-md
            "
            onClick={() => router.push(`/post/${post._id}`)} // optional
          >

            {/* MEDIA PREVIEW */}
            {previewMedia ? (

              previewMedia.type === "video" ? (

                <video
                  src={previewMedia.url}
                  className="
                    w-full h-full
                    object-cover
                    transition
                    group-hover:scale-105
                  "
                />

              ) : (

                <img
                  src={previewMedia.url}
                  className="
                    w-full h-full
                    object-cover
                    transition
                    group-hover:scale-105
                  "
                />

              )

            ) : (

              // fallback if no media
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm p-4 text-center">
                {post.text?.slice(0, 60)}
              </div>

            )}

            {/* HOVER OVERLAY */}
            <div className="
              absolute inset-0
              bg-black/40
              opacity-0
              group-hover:opacity-100
              transition
              flex items-center justify-center
            ">

              <span className="text-white text-sm font-medium">
                View
              </span>

            </div>

          </div>

        );

      })}

    </div>

  );
}
