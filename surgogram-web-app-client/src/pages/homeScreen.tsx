import React, { useState, useEffect } from "react";
import Image from "next/image";
import DialogContent from "@/components/DialogContent";
import DialogLayout from "@/components/DialogLayout";
import { useUser } from "@/context/userContext";
import { getAllPosts, createPost } from "@/services/postServices";
import {
  GetPostInterface,
  CreatePostInterface,
  GetAllPostsPaginatedInterface,
} from "@/interfaces/postInterfaces";
import { toast } from "react-toastify";
import PostCard from "@/components/PostCard"; // Import the new PostCard component
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [posts, setPosts] = useState<GetPostInterface[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts: GetAllPostsPaginatedInterface = await getAllPosts();
        const postsData = fetchedPosts.posts.map((postData) => postData);
        setPosts(postsData);
      } catch (error) {
        toast.error("Error fetching posts");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const toggleLike = (postId: number) => {
    setLikedPosts((prevLikedPosts) =>
      prevLikedPosts.includes(postId)
        ? prevLikedPosts.filter((id) => id !== postId)
        : [...prevLikedPosts, postId]
    );
  };

  const handleCreatePost = async (postData: CreatePostInterface) => {
    try {
      setLoading(true);
      await createPost(postData);
      const fetchedPosts: GetAllPostsPaginatedInterface = await getAllPosts();
      const postsData = fetchedPosts.posts.map((postData) => postData);
      setPosts(postsData);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post");
    } finally {
      setIsDialogVisible(false);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-fixed flex flex-col items-center text-white"
      style={{ backgroundImage: `url('/img/back.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      {/* Header Section */}
      <div className="relative z-10 mt-4 w-[90%] sm:w-[600px] p-4 bg-black bg-opacity-40 backdrop-blur-md flex justify-between items-center rounded-md">
        <h1 className="text-lg font-semibold">What’s on your mind?</h1>
        <button
          onClick={() => setIsDialogVisible(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Create Post
        </button>
      </div>

      {/* Posts Section */}
      <div className="relative z-10 mt-6 w-full sm:w-[600px] flex flex-col items-center space-y-6 px-4 sm:px-0 overflow-y-scroll max-h-[calc(100vh-100px)]">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            likedPosts={likedPosts}
            toggleLike={toggleLike}
          />
        ))}
      </div>

      {/* Dialog for Creating Post */}
      <DialogLayout isVisible={isDialogVisible}>
        <DialogContent
          onClose={() => setIsDialogVisible(false)}
          onCreatePost={handleCreatePost}
        />
      </DialogLayout>
      <Spinner isVisible={loading} />
      <Toast />
    </div>
  );
};

export default HomeScreen;
