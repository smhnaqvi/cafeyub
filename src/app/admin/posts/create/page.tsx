"use client";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { IPostForm } from "@/types/post";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreatePage() {
  const methods = useForm<IPostForm>();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = async (data: IPostForm) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    formdata.append("image", data.cover[0]);

    await axios
      .post("/api/posts", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log({ response });
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Title" {...register("title")} />
      <TextArea label="Content" {...register("content")} />
      <Input label="Image" {...register("cover")} type="file" />
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
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
