"use client";

import axios from "axios";

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
    <button
      className="my-4 bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={deletePosts}
    >
      {label}
    </button>
  );
};

export default DeletePostsButton;
