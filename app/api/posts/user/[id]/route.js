import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await dbConnect();

    const { id: userId } = await context.params;

    const posts = await Post.find({ 
      author: new mongoose.Types.ObjectId(userId),
     })
      .populate("author", "name avatarUrl")
      .sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });

  } catch (error) {
    console.error("❌ Failed to fetch user posts:", error);

    return NextResponse.json(
      { message: "Failed to fetch user posts" },
      { status: 500 }
    );
  }
}
