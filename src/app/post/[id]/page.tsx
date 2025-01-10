import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function PostPage({ params }: { params: { id: number } }) {
  const { id } = params;

  // Fetch the post by id
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id), // Convert the id to an integer if necessary
    },
  });

  // Handle the case where no post is found
  if (!post) {
    return notFound(); // Redirect to 404 page
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
