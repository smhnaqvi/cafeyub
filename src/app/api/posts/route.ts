import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { extname, join } from "path";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  try {
    if (id) {
      // Delete a specific post by id
      await prisma.post.delete({
        where: { id: Number(id) },
      });
      return new NextResponse(null, { status: 204 }); // No Content
    } else {
      // Delete all posts
      await prisma.post.deleteMany();
      return new NextResponse(null, { status: 204 }); // No Content
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;

  if (!title || !content || !image) {
    return NextResponse.json(
      { error: "Title, content, and image are required" },
      { status: 400 },
    );
  }

  const buffer = await image.arrayBuffer();
  const fileName = `${uuidv4()}${extname(image.name)}`;
  const filePath = join("public/storage", fileName);

  await fs.writeFile(filePath, Buffer.from(buffer));

  const newPost = await prisma.post
    .create({
      data: { title, content, cover: fileName },
    })
    .catch((err) => console.log(err));

  return NextResponse.json(newPost, { status: 201 });
}
