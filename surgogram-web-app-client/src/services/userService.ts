import axiosInstance from "@/utils/axiosInstance";
import {
  UpdateUserInterface,
  CreateUserInterface,
  UserInterface,
} from "@/interfaces/userInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createUser = async (
  userData: CreateUserInterface
): Promise<UserInterface> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/user/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  userData: UpdateUserInterface,
  userId: number
): Promise<UserInterface> => {
  try {
    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("userName", userData.userName);
    formData.append("imageFile", userData.imageFile);

    const response = await axiosInstance.put(
      `${BASE_URL}/user/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: number): Promise<UserInterface> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
