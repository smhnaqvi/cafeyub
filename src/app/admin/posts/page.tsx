import DeletePostsButton from "@/components/Post/DeletePostsButton";
import { PostCard } from "@/components/Post/PostCard";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export interface IPost {
  id: number;
  title: string;
  content: string | null;
  cover: string | null;
  createdAt: Date;
  updatedAt: Date;
}

async function PostsPage() {
  const fetchAllPost = await prisma.post.findMany();
  const deleteAllPosts = async () => {
    await axios.delete("/api/posts/delete");
  };

  return (
    <div>
      <h1>Posts</h1>

      <DeletePostsButton label="Delete All Posts" />

      <div className="flex mb-4 gap-4">
        {fetchAllPost.map((post, idx) => (
          <div key={idx} className="w-1/4 bg-gray-500 h-12">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsPage;
