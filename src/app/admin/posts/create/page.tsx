"use client";

import Input from "@/components/Input";
import PostForm from "@/components/Post/PostForm";
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
    formdata.append("latitude", data.latitude);
    formdata.append("longitude", data.longitude);
    formdata.append("address", data.address);
    formdata.append("city", data.city);
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

  return <PostForm editMode={false} />;
}
