"use client";

import React, { useState } from "react";
import PostContentModal from "./PostContentModal";
import { useAuth } from "../../context/AuthContext";

const MOCK_AVATAR = "https://picsum.photos/40/40?random=1";

interface Props {
  onPostCreated: () => void;
}

const PostCreator: React.FC<Props> = ({ onPostCreated }) => {

  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => setPostModalOpen(true)}
        className="
          relative rounded-2xl
          bg-black/40 backdrop-blur-2xl
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]
          p-4 cursor-pointer
        "
      >
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatarUrl || MOCK_AVATAR}
            className="w-10 h-10 rounded-full"
          />

          <div className="text-gray-400">
            Write something...
          </div>
        </div>
      </div>

      {/* Popup */}
      <PostContentModal
        isOpen={isPostModalOpen}
        onClose={() => setPostModalOpen(false)}
        onPostCreated={onPostCreated}
      />
    </>
  );
};

export default PostCreator;
