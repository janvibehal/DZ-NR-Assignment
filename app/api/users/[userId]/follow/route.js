import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req, context) {
  try {

    await connectDB();

    // ✅ GET TOKEN
    const token = req.headers.get("authorization")?.split(" ")[1];

    console.log("EXTRACTED TOKEN:", token);
    console.log("RAW AUTH HEADER:", req.headers.get("authorization"));

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    // ⭐⭐ IMPORTANT FIX HERE ⭐⭐
    const params = await context.params;
    const userId = params.userId;

    console.log("TARGET USER:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(userId);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const alreadyFollowing = currentUser.following.includes(userId);

    if (alreadyFollowing) {
      // UNFOLLOW
      currentUser.following.pull(userId);
      targetUser.followers.pull(currentUserId);
    } else {
      // FOLLOW
      currentUser.following.push(userId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    return NextResponse.json({
      following: !alreadyFollowing,
    });

  } catch (err) {

    console.error("FOLLOW ERROR:", err);

    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
