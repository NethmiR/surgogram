import axiosInstance from "@/utils/axiosInstance";
import {
  CreatePostInterface,
  PostInterface,
  GetAllPostsPaginatedInterface,
} from "@/interfaces/postInterfaces";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPost = async (
  postData: CreatePostInterface
): Promise<PostInterface> => {
  try {
    const formData = new FormData();
    formData.append("imageFile", postData.imageFile);
    formData.append("description", postData.description);
    formData.append("location", postData.location);
    formData.append("userId", postData.userId.toString());

    const response = await axiosInstance.post(`${BASE_URL}/post/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async (): Promise<GetAllPostsPaginatedInterface> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/post/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePostLikes = async (
  postId: number
): Promise<PostInterface> => {
  try {
    const response = await axiosInstance.put(`${BASE_URL}/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
