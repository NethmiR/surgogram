import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GetPostInterface } from "@/interfaces/postInterfaces";

interface PostCardProps {
  post: GetPostInterface;
  likedPosts: number[];
  toggleLike: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  likedPosts,
  toggleLike,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  };

  const formattedDate = formatDate(post.createdAt);

  return (
    <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-gray-500 rounded-full">
          <img
            src={post.user.profileUrl}
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold">{post.user.userName}</p>
          <p className="text-sm text-gray-300">{post.location}</p>
        </div>
      </div>
      <img src={post.URL} alt="Post" className="rounded-lg" />
      <p className="text-sm text-gray-200 mt-4">{post.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
        <div
          onClick={() => toggleLike(post.id)}
          className="cursor-pointer flex items-center space-x-1"
        >
          {likedPosts.includes(post.id) ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
          <span>{post.noOfLikes}</span>
        </div>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default PostCard;
