import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, bio, profilePic } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { name, bio, profilePic },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
