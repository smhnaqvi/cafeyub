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
  const image = formData.get("image") as File | null;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const workingTime = formData.get("workingTime") as string;
  const contactNumber = formData.get("contactNumber") as string | null;
  const instagramId = formData.get("instagramId") as string | null;

  // Validation
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and Longitude are required" },
      { status: 400 },
    );
  }

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  let fileName = "";

  // Handle the image upload if it exists
  if (image && image.size > 0) {
    const buffer = await image.arrayBuffer();
    fileName = `${uuidv4()}${extname(image.name)}`;
    const filePath = join("public/storage", fileName);
    await fs.writeFile(filePath, Buffer.from(buffer));
  }

  const newPost = await prisma.post
    .create({
      data: {
        title,
        content,
        cover: fileName,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        city,
        workingTime: workingTime,
        contactNumber,
        instagramId,
      },
    })
    .catch((err) => console.log(err));

  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  let updateData: any = {
    title: formData.get("title") || "",
    content: formData.get("content") || "",
    latitude: Number(formData.get("latitude")),
    longitude: Number(formData.get("longitude")),
    address: formData.get("address") || "",
    city: formData.get("city") || "",
    workingTime: formData.get("workingTime") || null,
    contactNumber: formData.get("contactNumber") || null,
    instagramId: formData.get("instagramId") || null,
  };

  let fileName = "";

  // Handle the image upload if it exists
  if (image && image.size > 0) {
    const buffer = await image.arrayBuffer();
    fileName = `${uuidv4()}${extname(image.name)}`;
    const filePath = join("public/storage", fileName);
    await fs.writeFile(filePath, Buffer.from(buffer));
    updateData.cover = fileName;
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
