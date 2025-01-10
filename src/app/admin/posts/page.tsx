import DeletePostsButton from "@/components/Post/DeletePostsButton";
import { PostCard } from "@/components/Post/PostCard";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import Link from "next/link";

const prisma = new PrismaClient();

async function PostsPage() {
  const fetchAllPost = await prisma.post.findMany();

  return (
    <div>
      <h1>Posts</h1>

      <div className="flex gap-4">
        <Link
          className="my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          href={`posts/create`}
        >
          Create New Post
        </Link>

        <DeletePostsButton label="Delete All Posts" />
      </div>

      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">title</th>
            <th className="text-left px-4 py-2">create at</th>
            <th className="text-left px-4 py-2">action</th>
          </tr>
        </thead>
        <tbody>
          {fetchAllPost.map((post, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-0">{post.title}</td>
              <td className="border px-4 py-0">
                {post.createdAt.toDateString()}
              </td>
              <td className="border px-4 py-0">
                <div className="flex gap-4">
                  <Link
                    className="my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    href={`posts/${post.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    href={`/post/${post.id}`}
                  >
                    View
                  </Link>
                  <DeletePostsButton id={post.id} label="Delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mb-4 gap-4"></div>
    </div>
  );
}

export default PostsPage;
