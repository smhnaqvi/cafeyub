import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import PostImage from "@/components/PostImage";
const prisma = new PrismaClient();

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const fetchAllPost = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: resolvedSearchParams.search || "",
          },
        },
        {
          address: {
            contains: resolvedSearchParams.search || "",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col p-24 main_page">
      <form className="">
        <div className="flex gap-2">
          <input
            name="search"
            defaultValue={resolvedSearchParams.search}
            placeholder="Search posts..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-opacity-80"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full mt-8">
        {fetchAllPost.map((post, idx) => {
          return (
            <Link
              href={`/post/${post.id}`}
              className="block bg-black w-full bg-opacity-80 p-4 m-1 text-right text-white relative group"
              key={idx}
            >
              <PostImage cover={post.cover || undefined} title={post.title} />
              <h1 className="text-lg font-semibold">{post.title}</h1>
              <h4 className="text-gray-400">{post.address}</h4>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
