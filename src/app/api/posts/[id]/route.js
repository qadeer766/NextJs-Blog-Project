import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

// GET /api/posts/[id]
export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error("Error fetching post:", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// DELETE /api/posts/[id]
export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    console.error("Error deleting post:", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
