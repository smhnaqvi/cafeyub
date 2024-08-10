import PostForm from "@/components/Post/PostForm";
import { IPost } from "@/types/post";
import { PrismaClient } from "@prisma/client";

interface EditPostPageProps {
  params: {
    id: string;
  };
}
const prisma = new PrismaClient();
export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });
  if (!post) {
    return <div>Post not found</div>;
  }
  return <PostForm data={post as IPost} editMode />;
}
