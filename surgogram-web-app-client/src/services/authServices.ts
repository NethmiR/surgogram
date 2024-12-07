import axios from "axios";
import { LoginResponseInterface } from "@/interfaces/userInterface";

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
        throw error;
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
        throw error;
    }
}