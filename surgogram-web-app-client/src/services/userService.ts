import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { UpdateUserInterface, CreateUserInterface, UserInterface } from "@/interfaces/userInterface";
import {
    BadRequestException,
    InternalServerException,
    UnexpectedException,
} from "@/utils/exceptions";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const createUser = async (
    userData: CreateUserInterface
): Promise<UserInterface> => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/user/`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    throw new BadRequestException("Enter valid email and password");
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
};

export const updateUser = async (
    userData: UpdateUserInterface,
    userId: number
): Promise<UserInterface> => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/user/${userId}`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    throw new BadRequestException("Enter valid email and password");
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

