"use client";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { IPost, IPostForm } from "@/types/post";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/Post/Card";

// Define the Zod schema
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  city: z.string().min(1, "City is required"),
  workingTime: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^\d+$/, "Contact number must be numeric")
    .optional(),
  instagramId: z.string().optional(),
  cover: z
    .any()
    .refine(
      (file) => (file?.length ? file[0]?.size <= 5 * 1024 * 1024 : true),
      {
        message: "Image must be less than 5MB",
      },
    )
    .optional(),
});

export default function PostForm({
  data: post,
  editMode = false,
}: {
  data?: IPost;
  editMode: boolean;
}) {
  const methods = useForm<IPostForm>({
    resolver: zodResolver(postSchema), // Use Zod resolver
    defaultValues: {
      title: post?.title || "",
      address: post?.address || "",
      latitude: post?.latitude || "",
      longitude: post?.longitude || "",
      city: post?.city || "",
      content: post?.content || "",
      workingTime: post?.workingTime || "",
      contactNumber: post?.contactNumber || "",
      instagramId: post?.instagramId || "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: IPostForm) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content || "");
    formdata.append("latitude", data.latitude || "");
    formdata.append("longitude", data.longitude || "");
    formdata.append("address", data.address || "");
    formdata.append("city", data.city);
    formdata.append("workingTime", data.workingTime || "");
    formdata.append("contactNumber", data.contactNumber || "");
    formdata.append("instagramId", data.instagramId || "");
    if (data.cover) {
      formdata.append("image", data.cover[0]);
    }

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
    <Card>
      <form
        className={` ${isSubmitting ? "opacity-50" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <Input label="عنوان" {...register("title")} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Input label="تصویر" {...register("cover")} type="file" />
          {errors.cover && (
            <p className="text-red-500">{errors.cover.message?.toString()}</p>
          )}
        </div>

        <div className="mb-4">
          <TextArea label="توضیحات" {...register("content")} />
        </div>

        <div className="mb-4">
          <Input label="آدرس" {...register("address")} />
        </div>

        <div className="mb-4">
          <Input label="شهر" {...register("city")} />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        <div className="mb-4">
          <Input label="ساعت فعالیت" {...register("workingTime")} />
        </div>

        <div className="mb-4">
          <Input label="تماس" {...register("contactNumber")} />
          {errors.contactNumber && (
            <p className="text-red-500">{errors.contactNumber.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Input label="آیدی اینستاگرام" {...register("instagramId")} />
        </div>

        <div className="mb-4 flex gap-4">
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
                ? "درحال بروزرسانی کافه..."
                : "درحال ثبت کافه..."
              : editMode
                ? "ویرایش کافه"
                : "ثبت کافه"}
          </button>
        </div>
      </form>
    </Card>
  );
}
