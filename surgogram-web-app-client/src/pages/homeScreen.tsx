import React, { useState } from "react";
import Image from "next/image";
import DialogContent from "@/components/DialogContent";
import DialogLayout from "@/components/DialogLayout";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

type Post = {
    id: number;
    username: string;
    university: string;
    image: string;
    likes: number;
    content: string;
    timestamp: string;
};

const posts: Post[] = [
    {
        id: 1,
        username: "john_doe",
        university: "University of Montclair",
        image: "/img/post1.jpg",
        likes: 350,
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        timestamp: "2024-12-06 10:20",
    },
    {
        id: 2,
        username: "john_doe",
        university: "University of Montclair",
        image: "/img/post2.jpg",
        likes: 350,
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        timestamp: "2024-12-06 10:20",
    },
    {
        id: 3,
        username: "john_doe",
        university: "University of Montclair",
        image: "/img/post3.jpg",
        likes: 350,
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        timestamp: "2024-12-06 10:20",
    },
];

const HomeScreen: React.FC = () => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    const toggleLike = (postId: number) => {
        setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.includes(postId)
                ? prevLikedPosts.filter((id) => id !== postId)
                : [...prevLikedPosts, postId]
        );
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
                                <p className="font-bold">{post.username}</p>
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
                                    <CiHeart />
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
                <DialogContent onClose={() => setIsDialogVisible(false)} />
            </DialogLayout>
        </div>
    );
};

export default HomeScreen;
