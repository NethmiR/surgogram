import axios from "axios";
import { LoginResponseInterface } from "@/interfaces/userInterface";
import {
    NotFoundException,
    UnauthorizedException,
    BadRequestException,
    InternalServerException,
    UnexpectedException,
} from "@/utils/exceptions";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const loginUser = async (
    email: string,
    password: string
): Promise<LoginResponseInterface> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 401) {
                    throw new UnauthorizedException("Invalid email or password");
                } else if (error.response.status === 404) {
                    throw new NotFoundException("User not found");
                } else if (error.response.status === 400) {
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

export const passwordReset = async (
    email: string
): Promise<any> => {
    try {
        await axios.post(`${BASE_URL}/auth/send-password-reset`, {
            email,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    throw new NotFoundException("User not found");
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