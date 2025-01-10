import AdminPageHeader from "@/components/Header/AdminPageHeader";
import { PlusIcon } from "@/components/Icons";
import Page from "@/components/Page";
import DeletePostsButton from "@/components/Post/DeletePostsButton";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React from "react";

const prisma = new PrismaClient();

async function PostsPage() {
  const fetchAllPost = await prisma.post.findMany();

  return (
    <React.Fragment>
      <AdminPageHeader title="لیست کافه ها" />
      <Page>
        <div className="flex gap-4">
          <Link
            className="flex gap-3 my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            href={`posts/create`}
          >
            اضافه کردن کافه جدید
            <PlusIcon />
          </Link>

          {/* <DeletePostsButton label="Delete All Posts" /> */}
        </div>

        <table className="table-auto w-full border-collapse">
          <thead className="rounded-t-3xl sticky top-0 bg-gray-100">
            <tr>
              <th className="text-right px-4 py-2 first:rounded-tr-xl last:rounded-tr-xl">
                نام کافه
              </th>
              <th className="text-right px-4 py-2">تاریخ ایجاد</th>
              <th className="text-right px-4 py-2">آیدی اینستاگرام</th>
              <th className="text-right px-4 py-2 last:rounded-tl-xl"></th>
            </tr>
          </thead>
          <tbody>
            {fetchAllPost.map((post, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-0">{post.title}</td>
                <td className="border px-4 py-0">
                  {post.createdAt.toDateString()}
                </td>
                <td className="border px-4 py-0">{post.instagramId || "-"}</td>
                <td className="border px-4 py-0">
                  <div className="flex gap-4">
                    <Link
                      className="my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      href={`posts/${post.id}`}
                    >
                      ویرایش
                    </Link>
                    <Link
                      className="my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      href={`/post/${post.id}`}
                    >
                      دیدن
                    </Link>
                    <DeletePostsButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex mb-4 gap-4"></div>
      </Page>
    </React.Fragment>
  );
}

export default PostsPage;
