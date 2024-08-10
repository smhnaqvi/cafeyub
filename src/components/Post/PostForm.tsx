"use client";
import { IPost, IPostForm } from "@/types/post";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../Input";
import TextArea from "../TextArea";

export default function PostForm({
  data: post,
  editMode = false,
}: {
  data?: IPost;
  editMode: boolean;
}) {
  const methods = useForm<IPostForm>({
    defaultValues: {
      title: post?.title,
      address: post?.address,
      latitude: post?.latitude,
      longitude: post?.longitude,
      city: post?.city || "",
      content: post?.content || "",
    },
  });
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
    formdata.append("latitude", data.latitude);
    formdata.append("longitude", data.longitude);
    formdata.append("address", data.address);
    formdata.append("city", data.city);
    formdata.append("image", data.cover[0]);

    await (
      editMode && post
        ? axios.put("/api/posts?id=" + post.id, formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : axios.post("/api/posts", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
    )
      .then((response) => {
        console.log({ response });
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <form
        className={` ${isSubmitting ? "opacity-50" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {editMode ? "Edit Post" : "Create New Post"}
        </h2>

        <div className="mb-4">
          <Input label="Title" {...register("title")} />
        </div>

        <div className="mb-4">
          <Input label="Image" {...register("cover")} type="file" />
        </div>

        <div className="mb-4">
          <TextArea label="Content" {...register("content")} />
        </div>

        <div className="mb-4">
          <Input label="Address" {...register("address")} />
        </div>

        <div className="mb-4">
          <Input label="City" {...register("city")} />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <Input label="Latitude" {...register("latitude")} />
          </div>
          <div className="w-1/2">
            <Input label="Longitude" {...register("longitude")} />
          </div>
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? editMode
                ? "Updating..."
                : "Creating..."
              : editMode
                ? "Update Post"
                : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
