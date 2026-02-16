"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Image, Video, Smile } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface PostContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void; // ⭐ REQUIRED
}

const PostContentModal: React.FC<PostContentModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const { user } = useAuth();

  const [content, setContent] = useState("");
//added..
 const handlePost = async () => {
  if (!content.trim()) return;

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("text", content);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setContent("");
    onClose();
    window.location.reload();
  } catch (err) {
    console.error("Post failed:", err);
  }
};

//....
  const [text, setText] = useState("");
  const [feeling, setFeeling] = useState("");
  const [loading, setLoading] = useState(false);

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<
    { url: string; type: "image" | "video" }[]
  >([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // cleanup memory
  useEffect(() => {
    return () => {
      previewUrls.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previewUrls]);

  if (!isOpen) return null;

  const addFiles = (files: FileList | null, type: "image" | "video") => {
    if (!files) return;

    const newFiles = Array.from(files);

    setMediaFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type,
    }));

    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleCreatePost = async () => {
    try {
      if (!text.trim() && mediaFiles.length === 0) return;

      setLoading(true);

      const token = user?.token;

      const formData = new FormData();

      formData.append("text", text);
      formData.append("feeling", feeling);

      mediaFiles.forEach((file) => {
        formData.append("mediaFile", file);

        formData.append(
          "mediaType",
          file.type.startsWith("video") ? "video" : "image",
        );
      });

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      // ⭐ RESET
      setText("");
      setFeeling("");
      setMediaFiles([]);
      setPreviewUrls([]);

      // ⭐ REFRESH FEED
      onPostCreated();

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/10 shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* USER */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.avatarUrl || "https://picsum.photos/40/40"}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-white">{user?.name || "User"}</span>
        </div>

        <input
          placeholder="Feeling (optional)"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          className="w-full mb-3 bg-white/5 border border-white/10 rounded-lg p-3 text-white"
        />

        <textarea
          placeholder="What’s on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white min-h-[120px]"
        />

        {/* PREVIEW GRID */}
        {previewUrls.length > 0 && (
          <div
            className={`grid gap-2 mt-3 ${previewUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {previewUrls.map((p, i) => (
              <div key={i} className="relative group">
                <button
                  onClick={() => {
                    setPreviewUrls((prev) =>
                      prev.filter((_, index) => index !== i),
                    );
                    setMediaFiles((prev) =>
                      prev.filter((_, index) => index !== i),
                    );
                  }}
                  className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} className="text-white" />
                </button>

                {p.type === "image" ? (
                  <img
                    src={p.url}
                    className="w-full h-52 object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={p.url}
                    controls
                    className="w-full h-52 object-cover rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          ref={imageInputRef}
          onChange={(e) => addFiles(e.target.files, "image")}
        />

        <input
          type="file"
          multiple
          accept="video/*"
          hidden
          ref={videoInputRef}
          onChange={(e) => addFiles(e.target.files, "video")}
        />

        <div className="flex justify-between mt-4">
          <div className="flex gap-3 text-gray-400">
            <Image
              onClick={() => imageInputRef.current?.click()}
              className="cursor-pointer hover:text-white"
            />
            <Video
              onClick={() => videoInputRef.current?.click()}
              className="cursor-pointer hover:text-white"
            />
            <Smile
              onClick={() => setText((prev) => prev + " 😊")}
              className="cursor-pointer hover:text-white"
            />
          </div>

          <button
            onClick={handlePost}
            className="
              bg-orange-500
              hover:bg-orange-600
              text-whiteA
              px-4 py-2
              rounded-lg
              font-medium
            "
            onClick={handleCreatePost}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
          >
            {loading ? "Posting..." : "Post"}
          </button>


   
        </div>
      </div>
    </div>
  );
};

export default PostContentModal;
