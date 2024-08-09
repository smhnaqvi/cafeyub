import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { PrismaClient } from "@prisma/client";
import { FormEvent } from "react";

async function EditPostPage({ params }: any) {
  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({ event });
  }

  console.log({ post });
  const isSubmitting = false;
  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <input type="text" name="name" />
        </div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {isSubmitting ? "is submitting ..." : "Create Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditPostPage;
