import Image from "next/image";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function Home() {
  const fetchAllPost = await prisma.post.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 main_page">
      {fetchAllPost.map((post, idx) => {
        return (
          <div
            className="bg-black w-full bg-opacity-80 p-4 m-1 text-right text-white"
            key={idx}
          >
            <h1>{post.title}</h1>
            <h4 className="text-gray-400">adress</h4>
          </div>
        );
      })}
    </main>
  );
}

export default Home;
