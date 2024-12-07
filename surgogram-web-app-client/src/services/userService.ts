import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { UpdateUserInterface, CreateUserInterface, UserInterface } from "@/interfaces/userInterface";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const createUser = async (
    userData: CreateUserInterface
): Promise<UserInterface> => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/user/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (
    userData: UpdateUserInterface,
    userId: number
): Promise<UserInterface> => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/user/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

