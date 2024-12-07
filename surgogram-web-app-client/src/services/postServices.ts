import axiosInstance from "@/utils/axiosInstance";
import { CreatePostInterface, PostInterface, GetAllPostsPaginatedInterface } from "@/interfaces/postInterfaces";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const createPost = async (
    postData: CreatePostInterface
): Promise<PostInterface> => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/post/`, postData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllPosts = async (): Promise<GetAllPostsPaginatedInterface> => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/post/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePostLikes = async (postId: number): Promise<PostInterface> => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/post/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}