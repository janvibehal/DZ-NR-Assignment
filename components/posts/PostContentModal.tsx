"use client";

import React, { useState } from "react";
import { X, Image, Video, Smile } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface PostContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostContentModal: React.FC<PostContentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();

  const [content, setContent] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        z-[9999]
        flex items-center justify-center
        bg-black/40 backdrop-blur-xl
      "
    >
      {/* CLICK OUTSIDE CLOSE */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL CONTENT */}
      <div
        className="
          relative
          w-full max-w-xl
          mx-4
          rounded-2xl
          bg-black/50
          backdrop-blur-2xl
          border border-white/10
          shadow-2xl
          p-6
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* USER HEADER */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={
              user?.avatarUrl ||
              "https://picsum.photos/40/40?random=1"
            }
            className="w-10 h-10 rounded-full"
          />
          <span className="text-white font-medium">
            {user?.name || "User"}
          </span>
        </div>

        {/* TEXT AREA */}
        <textarea
          placeholder="What’s on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            w-full
            bg-white/5
            border border-white/10
            rounded-lg
            p-3
            text-white
            placeholder-gray-400
            resize-none
            outline-none
            min-h-[120px]
          "
        />

        {/* ACTION BAR */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3 text-gray-400">
            <Image className="cursor-pointer hover:text-white" />
            <Video className="cursor-pointer hover:text-white" />
            <Smile className="cursor-pointer hover:text-white" />
          </div>

          <button
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-4 py-2
              rounded-lg
              font-medium
            "
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContentModal;
