import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DialogContent from "@/components/DialogContent";
import DialogLayout from "@/components/DialogLayout";
import {
  getAllPosts,
  createPost,
  updatePostLikes,
} from "@/services/postServices";
import {
  GetPostInterface,
  CreatePostInterface,
  GetAllPostsPaginatedInterface,
} from "@/interfaces/postInterfaces";
import { toast } from "react-toastify";
import PostCard from "@/components/PostCard"; // Import the new PostCard component
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";
import { useUser } from "@/context/userContext";

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [posts, setPosts] = useState<GetPostInterface[]>([]);

  const router = useRouter();

  const { user } = useUser();
  const limit = 10;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      if (!user) {
        router.push("/signIn");
        return;
      }

      setLoading(true);
      const fetchedPosts: GetAllPostsPaginatedInterface = await getAllPosts(
        1,
        10,
        user.id
      );
      const postsData = fetchedPosts.posts.map((postData) => postData);
      setPosts(postsData);
    } catch (error) {
      toast.error("Error fetching posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (postId: number) => {
    try {
      if (!user) {
        router.push("/signIn");
        return;
      }
      setLoading(true);
      await updatePostLikes(postId, user.id);
      fetchPosts();
    } catch (error) {
      toast.error("Error updating likes");
      console.error("Error updating likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData: CreatePostInterface) => {
    try {
      setLoading(true);
      await createPost(postData);
      fetchPosts();
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
          <PostCard key={post.id} post={post} toggleLike={toggleLike} />
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
