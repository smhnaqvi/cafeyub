"use client";

import axios from "axios";
import Button from "../Button";

interface IDeleteAllPostsButtonProps {
  id?: number;
  label: string;
}
const DeletePostsButton: React.FC<IDeleteAllPostsButtonProps> = ({
  id,
  label,
}) => {
  const deletePosts = async () => {
    const deletePostsUrl = `/api/posts` + (id ? `?id=${id}` : "");
    const response = await axios.delete(deletePostsUrl);
  };

  return (
    <Button variant="danger" onClick={deletePosts}>
      {label}
    </Button>
  );
};

export default DeletePostsButton;
