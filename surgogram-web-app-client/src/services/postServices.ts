import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { CreatePostInterface, PostInterface, GetPostInterface } from "@/interfaces/postInterfaces";
import {
    BadRequestException,
    InternalServerException,
    UnexpectedException,
} from "@/utils/exceptions";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const createPost = async (
    postData: CreatePostInterface
): Promise<PostInterface> => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/post/`, postData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    throw new BadRequestException("Enter valid data");
                } else {
                    throw new UnexpectedException("Unexpected error occurred");
                }
            } else {
                throw new InternalServerException("Internal server error");
            }
        } else {
            throw new UnexpectedException("An unexpected error occurred");
        }
    }
}

export const getAllPosts = async (): Promise<GetPostInterface[]> => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/post/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new UnexpectedException("Unexpected error occurred");
            } else {
                throw new InternalServerException("Internal server error");
            }
        } else {
            throw new UnexpectedException("An unexpected error occurred");
        }
    }
}

export const updatePostLikes = async (postId: number): Promise<PostInterface> => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/post/${postId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new UnexpectedException("Unexpected error occurred");
            } else {
                throw new InternalServerException("Internal server error");
            }
        } else {
            throw new UnexpectedException("An unexpected error occurred");
        }
    }
}