import Post from "@/models/Post.js";
import User from "@/models/User.js";
import { canEditOrDelete } from "@/utils/permissions.js";

/* =========================
   CREATE POST
========================= */

export const createPost = async (userId, data) => {

  const post = new Post({
    author: userId,                     // ⭐ correct field
    text: data.text || "",
    feeling: data.feeling || "",
    withUser: data.withUser || null,
    media: data.media || [],
    emojis: data.emojis || [],
  });

  await post.save();

  // populate before returning
  return await Post.findById(post._id)
    .populate("author", "name avatarUrl")
    .populate("withUser", "name avatarUrl");
};

/* =========================
   GET ALL POSTS
========================= */

export const getAllPosts = async () => {

  return await Post.find()
    .populate("author", "name avatarUrl")
    .populate("withUser", "name avatarUrl")
    .populate("likes", "name avatarUrl")
    .sort({ createdAt: -1 });

};

/* =========================
   GET SINGLE POST
========================= */

export const getPostById = async (id) => {

  const post = await Post.findById(id)
    .populate("author", "name avatarUrl")
    .populate("withUser", "name avatarUrl")
    .populate("likes", "name avatarUrl");

  if (!post) throw new Error("Post not found");

  return post;
};

/* =========================
   UPDATE POST
========================= */

export const updatePost = async (id, user, updates) => {

  const post = await Post.findById(id);

  if (!post) throw new Error("Post not found");

  if (!canEditOrDelete(post, user))
    throw new Error("Permission denied");

  Object.assign(post, updates);

  await post.save();

  return await getPostById(id);
};

/* =========================
   DELETE POST
========================= */

export const deletePost = async (id, user) => {

  const post = await Post.findById(id);

  if (!post) throw new Error("Post not found");

  if (!canEditOrDelete(post, user))
    throw new Error("Permission denied");

  await Post.findByIdAndDelete(id);

  return { message: "Post deleted" };
};
