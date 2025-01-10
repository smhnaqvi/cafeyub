import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Required to handle file uploads
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    console.log("---------->", file); // Log to inspect the file object

    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 },
      );
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer()).toString("utf-8");

    // Read the file content
    // const buffer = await file.arrayBuffer();
    // const fileContent = Buffer.from(buffer).toString("utf-8");

    let posts;

    try {
      posts = JSON.parse(buffer);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 },
      );
    }

    // Validate JSON structure
    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json(
        { error: "JSON file must contain an array of posts" },
        { status: 400 },
      );
    }

    // Validate each post
    const validPosts = posts.map((post) => {
      if (!post.title || !post.address || !post.city) {
        throw new Error(
          `Missing required fields in post: ${JSON.stringify(post)}`,
        );
      }

      return {
        title: post.title,
        content: post.content || null,
        cover: post.cover || null,
        latitude: parseFloat(post.latitude),
        longitude: parseFloat(post.longitude),
        address: post.address,
        city: post.city,
        workingTime: post.workingTime || null,
        contactNumber: post.contactNumber || null,
        instagramId: post.instagramId || null,
      };
    });

    // Insert into the database using Prisma's createMany
    const result = await prisma.post.createMany({ data: validPosts });

    return NextResponse.json(
      { message: `${result.count} posts added successfully.` },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
