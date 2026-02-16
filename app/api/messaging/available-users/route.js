import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {

  try {

    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    await connectDB();

    const me = await User.findById(decoded.id)
      .populate("following", "name avatarUrl followers");

    if (!me) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // mutual followers
    const mutualUsers = me.following.filter(user =>
      user.followers.some(f => f.toString() === decoded.id)
    );

    return NextResponse.json({ users: mutualUsers });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch messaging users" },
      { status: 500 }
    );
  }
}
