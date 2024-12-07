import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import DialogContent from "@/components/DialogContent";
import DialogLayout from "@/components/DialogLayout";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useUser } from "@/context/userContext";
import { getAllPosts, createPost } from "@/services/postServices";
import { PostInterface, GetPostInterface, CreatePostInterface } from "@/interfaces/postInterfaces";

const HomeScreen: React.FC = () => {
    const { user, setUser } = useUser();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [posts, setPosts] = useState<PostInterface[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts: GetPostInterface[] = await getAllPosts();
                const postsData = fetchedPosts.map((postData) => postData.post);
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        if (user) {
            fetchPosts();
        }
    }, [user]);

    const toggleLike = (postId: number) => {
        setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.includes(postId)
                ? prevLikedPosts.filter((id) => id !== postId)
                : [...prevLikedPosts, postId]
        );
    };

    const handleCreatePost = async (postData: CreatePostInterface) => {
        try {
            await createPost(postData);
            const fetchedPosts: GetPostInterface[] = await getAllPosts();
            const postsData = fetchedPosts.map((postData) => postData.post);
            setPosts(postsData);
        } catch (error) {
            console.error("Error creating post:", error);
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
                    <div
                        key={post.id}
                        className="bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md w-full"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-10 h-10 bg-gray-500 rounded-full" />
                            <div>
                                <p className="font-bold">{post.userId.}</p>
                                <p className="text-sm text-gray-300">{post.university}</p>
                            </div>
                        </div>
                        <Image
                            src={post.image}
                            alt="Post"
                            className="rounded-lg"
                            width={600}
                            height={256}
                        />
                        <p className="text-sm text-gray-200 mt-4">{post.content}</p>
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
                                <span>{post.likes}</span>
                            </div>
                            <p>{post.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog for Creating Post */}
            <DialogLayout isVisible={isDialogVisible}>
                <DialogContent onClose={() => setIsDialogVisible(false)} onCreatePost={handleCreatePost} />
            </DialogLayout>
        </div>
    );
};

export default HomeScreen;
