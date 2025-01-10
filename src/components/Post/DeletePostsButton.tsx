"use client";

import axios from "axios";
import Button from "../Button";
import { TrashIcon } from "../Icons";

interface IDeleteAllPostsButtonProps {
  id?: number;
}
const DeletePostsButton: React.FC<IDeleteAllPostsButtonProps> = ({ id }) => {
  const deletePosts = async () => {
    const deletePostsUrl = `/api/posts` + (id ? `?id=${id}` : "");
    const response = await axios.delete(deletePostsUrl);
  };

  return (
    <Button variant="danger" onClick={deletePosts}>
      <TrashIcon />
    </Button>
  );
};

export default DeletePostsButton;
