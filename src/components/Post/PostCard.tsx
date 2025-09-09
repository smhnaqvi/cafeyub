import Image from "next/image";
import DeletePostsButton from "./DeletePostsButton";
import { IPost } from "@/types/post";

export function PostCard({ post }: { post: IPost }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      {post.cover && (
        <Image
          width={100}
          height={100}
          className="w-full"
          src={`/storage/${post.cover}`}
          alt="Sunset in the mountains"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.content}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <DeletePostsButton id={post.id} />
      </div>
    </div>
  );
}
