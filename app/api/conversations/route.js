import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import { verifyToken } from '@/lib/auth';
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    await connectDB();

    // Get all conversations for the user
    const conversations = await Conversation.find({
      participants: decoded.id,
    })
      .populate('participants', 'name profilePicture')
      .sort({ lastMessageAt: -1 })
      .lean();

    // Get unread count for each conversation
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv) => {
        const otherUser = conv.participants.find(
          (p) => p._id.toString() !== decoded.id
        );

        const unreadCount = await Message.countDocuments({
          conversationId: conv.participants.map(p => p._id.toString()).sort().join('-'),
          receiver: decoded.id,
          read: false,
        });

        return {
          ...conv,
          otherUser,
          unreadCount,
        };
      })
    );

    return NextResponse.json({ conversations: conversationsWithUnread }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}



const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req) {

  try {

    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error:"Unauthorized" }, { status:401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const currentUserId = decoded.id;

    const body = await req.json();
    const otherUserId = body.otherUserId;

    if (!otherUserId) {
      return NextResponse.json({ error:"Missing otherUserId" }, { status:400 });
    }

    // ⭐ FETCH BOTH USERS
    const currentUser = await User.findById(currentUserId);
    const otherUser = await User.findById(otherUserId);

    if (!currentUser || !otherUser) {
      return NextResponse.json({ error:"User not found" }, { status:404 });
    }

    // ⭐ MUTUAL FOLLOW CHECK
    const currentFollowsOther = currentUser.following.includes(otherUserId);
    const otherFollowsCurrent = otherUser.following.includes(currentUserId);

    if (!currentFollowsOther || !otherFollowsCurrent) {

      return NextResponse.json(
        { error:"Mutual follow required" },
        { status:403 }
      );

    }

    // ⭐ CHECK IF CONVERSATION EXISTS
    const existing = await Conversation.findOne({
      participants: { $all: [currentUserId, otherUserId] },
    });

    if (existing) {
      return NextResponse.json({ conversation: existing });
    }

    // ⭐ CREATE NEW CONVERSATION
    const newConversation = await Conversation.create({
      participants: [currentUserId, otherUserId],
    });

    return NextResponse.json({ conversation: newConversation });

  } catch(err) {

    console.error(err);

    return NextResponse.json({ error:"Failed" }, { status:500 });

  }
}
