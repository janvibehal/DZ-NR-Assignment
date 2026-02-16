import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req, context) {

  try {

    await dbConnect();

    // ⭐ NEW NEXTJS VERSION FIX
    const params = await context.params;
    const userId = params.userId;

    console.log("Fetching user:", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "User ID missing" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId)
      .select("name avatarUrl bio followers following streaks points verified");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (err) {

    console.error("User fetch error:", err);

    return NextResponse.json(
      { message: "Failed to fetch user", error: err.message },
      { status: 500 }
    );
  }
}
