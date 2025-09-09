import PostForm from "@/app/admin/posts/create/components/PostForm";
import { IPost } from "@/types/post";
import { PrismaClient } from "@prisma/client";
import React from "react";
import Page from "@/components/Page";
import AdminPageHeader from "@/components/Header/AdminPageHeader";
import ADMIN_PATH from "@/constant/AdminPath";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

const prisma = new PrismaClient();

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  // Fetch the post using Prisma
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  // Handle case where post is not found
  if (!post) {
    return (
      <Page>
        <div>Post not found</div>
      </Page>
    );
  }

  // Render the form with the post data
  return (
    <React.Fragment>
      <AdminPageHeader
        backLink={ADMIN_PATH.posts.root}
        title={`Edit Post (${post.title})`}
      />
      <Page>
        <PostForm data={post as unknown as IPost} editMode />
      </Page>
    </React.Fragment>
  );
}
